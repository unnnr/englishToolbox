<?php

namespace App\Services\Auth;

use Symfony\Component\HttpFoundation\Response;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\Request;
use App\Models\VerificationCode;


class VerificationService
{
    public const RESENDING_ATTEMPT_VALUE = 3;

    public const MAX_ATTEMPTS = 10;

    private function generateKey(int $digitsCount = 4) 
    {
        $max = pow(10, $digitsCount);
        $code = random_int(0, $max);

        return $code;
    }

    public function createCode($user) 
    {
        // Deleting previous code
        $previosCode = $user->emailVerification;
        if ($previosCode)
            VerificationCode::destroy($previosCode->id);
        
        // Creating new instance
        $user->verificationCodes()->create([
            'key' => $this->generateKey(),
            'type' => 'email', 
        ]);

        $user->sendEmailVerificationNotification();
    }

    public function verify(Request $request)
    {
        $user = auth()->user();
        $verification = $user->emailVerification;
        
        // If the user is already verified or verification doesnt exist
        if ($user->hasVerifiedEmail() || !!!$verification)
            abort(Response::HTTP_BAD_REQUEST);
        
        // If user exceed all attempts
        if ($verification->attempts >= self::MAX_ATTEMPTS)
            abort(Response::HTTP_BAD_REQUEST, 'You have failed too many attempts. Please try again later');
        
        $input = (int)$request->input('code');

        // If Code is inccorect
        if ($input !== $verification->key)
        {
            $verification->attempts++;
            $verification->save();

            throw ValidationException::withMessages([
                'code' => [ 'Your code is inccorect' ]
            ]);
        }
        
        
        $verification->delete();
        $user->markEmailAsVerified();

        event(new Verified($request->user()));
    }

    public function resend(Request $request) 
    {
        $user = auth()->user();
        $verification = $user->emailVerification;
        
        // Preventing redundant request
        if ($user->hasVerifiedEmail() || !!!$verification)
            abort(Response::HTTP_BAD_REQUEST);

        if ($verification->attempts >= self::MAX_ATTEMPTS)
          abort(Response::HTTP_BAD_REQUEST, 'You have failed too many attempts. Please try again later');
        
        // Updating verification
        $verification->attempts = 
            min($verification->attempts + self::RESENDING_ATTEMPT_VALUE, self::MAX_ATTEMPTS);

        $verification->key = 
            $this->generateKey();

        $verification->save();
        
        // Changing mail
        $newEmail = $request->input('newEmail');
        if ($newEmail)
            $user->update(['email' => $newEmail ]);

        // sending code
        $user->sendEmailVerificationNotification();
    }

    public function clearExceeded () {
        $conditions = [
            'type' => 'email',
            'attempts' => self::MAX_ATTEMPTS
        ];

        VerificationCode::where($conditions)->chunkById(200, function ($codes) {
            foreach ($codes as $code) {
                // Creting new key
                $newKey = $this->generateKey();
                $code->update([
                    'key' => $newKey,
                    'attempts' => '0'
                ]);
                
                // Sending notification
                $code->user->sendEmailVerificationNotification();
            }
        });
    }
}
