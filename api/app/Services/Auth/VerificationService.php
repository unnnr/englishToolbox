<?php

namespace App\Services\Auth;

use Symfony\Component\HttpFoundation\Response;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\Request;


class VerificationService
{
    public function some_verify(Request $request)
    {

        $urlID = (string) $request->route('id');
        $userID =  (string) $request->user()->getKey();

        if (!!!hash_equals( $urlID, $userID))
            throw new AuthorizationException;

        $urlEmail = (string) $request->route('hash');
        $userEmail = $request->user()->getEmailForVerification();

        if (!!!hash_equals($urlEmail, sha1($userEmail)))
            throw new AuthorizationException;

        if ($request->user()->hasVerifiedEmail())
            return $request->wantsJson() 
                        ? response('', Responce::HTTP_NO_CONTENT)
                        : redirect('profile'); 

        if ($request->user()->markEmailAsVerified())
            event(new Verified($request->user()));

        return $request->wantsJson() 
                    ? response('', Responce::HTTP_NO_CONTENT)
                    : redirect('profile');     
    }

    public const MAX_ATTEMPTS = 10;

    private function generateKey(int $digitsCount = 4) 
    {
        $max = pow(10, $digitsCount);
        $code = random_int(0, $max);

        return $code;
    }

    public function createCode() 
    {
        $user = auth()->user();

        // Deleting previous code
        $previosCode = $user->emailVerification;
        if ($previosCode)
            VerificationCode::destroy($previosCode->id);
        
        // Creating new instance
        $key = $this->generateKey();
        $user->verificationCodes()->create([
            'hash' => bcrypt($key),
            'type' => 'email',
        ]);

        return $key;
    }

    public function verify(Request $request)
    {
        $user = auth()->user();
        $verification = $user->emailVerification;
        
        if ($user->hasVerifiedEmail() || !!!$verification)
            abort(Response::BAD_REQUEST);
        
        if ($verification->attempts >= self:: MAX_ATTEMPTS)
            abort(Response::BAD_REQUEST, 'You have failed too many attempts. Please try again later');
        
        $input = $request->input('code');
        if (!!!Hash::check($input, $verification->hash))
        {
            $verification->attempts++;
            $verification->save();

            throw ValidationException::withMessages([
                'code' => [trans('auth.failed')]
            ]);
        }

        $verification->delete();
        $user->markEmailAsVerified();

        event(new Verified($request->user()));
    }

    public function reset() 
    {

    }
}
