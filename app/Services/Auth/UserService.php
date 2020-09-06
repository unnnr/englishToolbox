<?php

namespace App\Services\Auth;

use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Services\Contracts\MustHandleAuthentication;
use App\Services\Traits\HandleAuthentication;
use App\Http\Resources\UserResource;
use App\Http\Resources\AuthenticatedUserResource;
use App\Models\User;
use App\Events\EmailChaged;


class UserService implements MustHandleAuthentication
{
    use HandleAuthentication;

    const REMEMBER_ME = true;

    public function currentUser()
    {
        $user = auth()->user();
        
        return new UserResource($user);
    }

    public function udpate(Request $request)
    {
        $user = auth()->user();


        /// TO MIDDLEWATE

        $confirmation = $request->input('password');
        $password = $user->password;

        if (!!!Hash::check($password, $confirmation))
        {
            throw ValidationException::withMessage([
                'password' => 'Icorrect password'
            ]);
        }

        /// TO MIDDLEWATE

        if ($request->has('newPassword'))
            $user->password = $request->input('newPassword');

        if ($request->has('email'))
        { 
            $user->email = $request->input('email');
            $user->email_verified_at = null;
            
            event(new EmailChanged($user));
        }

        $user->save();

        return new UserResource($user);
    }

    public function destroy()
    {
        // 
    }
}
