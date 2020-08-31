<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Events;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\URL;
use Symfony\Component\HttpFoundation\Response;

class VerificationService
{
    public function verify(Request $request)
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
            return response('', Responce::HTTP_NO_CONTENT);
        
        if ($request->user()->markEmailAsVerified())
            event(new Verified($request->user()));

        return response('', Responce::HTTP_NO_CONTENT);
    }

    public function verificationUrl($user)
    {
        return URL::temporarySignedRoute(
            'verify',
            Carbon::now()->addMinutes(Config::get('auth.verification.expire', 60)),
            [
                'id' => $user->getKey(),
                'hash' => sha1($user->getEmailForVerification()),
            ]
        );
    }
}
