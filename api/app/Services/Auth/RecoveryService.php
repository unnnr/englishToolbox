<?php

namespace App\Services\Auth;

use Symfony\Component\HttpFoundation\Response;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;
use App\Models\VerificationCode;
use App\Models\User;


class RecoveryService
{
    public const RESENDING_ATTEMPT_VALUE = 3;

    public const MAX_ATTEMPTS = 10;

    private function generateKey(int $digitsCount = 4) 
    {
        $max = pow(10, $digitsCount);
        $code = random_int(0, $max);

        return $code;
    }

    private function getUser(Request $request) 
    {
        $user = null;
        
        if ($request->has('email'))
        {
            $email = $request->input('email');
            $user = User::where('email', $email)
                ->firstOrFail();
        }
        else if(auth('sanctum')->check())
            $user = auth()->user();
        else
            abort(Response::HTTP_BAD_REQUEST);

        return $user;
    }

    public function createCode(Request $requst) 
    {
        $user = $this->getUser($requst);

        // Return if recovery already exist
        if ($user->passwordRecovery)
            return;

        // Deleting previous code
        $previosCode = $user->passwordRecovery;
        if ($previosCode)
            VerificationCode::destroy($previosCode->id);
        
        // Creating new instance
        $user->verificationCodes()->create([
            'key' => $this->generateKey(),
            'type' => 'password', 
        ]);

        $user->sendRecoveryNotification();
    }

    public function confirm(Request $request)
    {
        $user = $this->getUser($requst);
        $recovery = $user->passwordRecovery;
        
        // If recovery doesnt exist
        if (!!!$recovery)
            abort(Response::HTTP_BAD_REQUEST);
        
        // If user exceed all attempts
        if ($recovery->attempts >= self::MAX_ATTEMPTS)
            abort(Response::HTTP_BAD_REQUEST, 'You have failed too many attempts. Please try again later');
        
        $input = (int)$request->input('code');

        // If Code is inccorect
        if ($input !== $recovery->key)
        {
            $recovery->attempts++;
            $recovery->save();

            throw ValidationException::withMessages([
                'code' => [ 'Your code is inccorect' ]
            ]);
        }
        
        
        $recovery->delete();

        $newPassword = 
            $requst->input('password');

        $user->changePassword(newPassword);
    }

    public function resend(Request $request) 
    {
        $user = $this->getUser($request);
        $recovery = $user->emailVerification;
        
        // Preventing redundant request
        if (!!!$recovery)
            abort(Response::HTTP_BAD_REQUEST);

        if ($recovery->attempts >= self::MAX_ATTEMPTS)
          abort(Response::HTTP_BAD_REQUEST, 'You have failed too many attempts. Please try again later');
        
        // Updating verification
        $recovery->attempts = 
            min($recovery->attempts + self::RESENDING_ATTEMPT_VALUE, self::MAX_ATTEMPTS);

        $recovery->key = 
            $this->generateKey();

        $recovery->save();
        
        // sending code
        $user->sendRecoveryNotification();
    }

    public function clearExceeded () {
        VerificationCode::where([
            'type' => 'password',
            'attempts' => self::MAX_ATTEMPTS
        ])->delete();
    }
}
