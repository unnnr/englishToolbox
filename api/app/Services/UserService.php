<?php

namespace App\Services;

use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Http\Resources\UserResource;
use App\Http\Resources\AuthenticatedUserResource;
use App\Models\User;
use App\Events\EmailChanged;


class UserService 
{
    public function currentUser()
    {
        $user = auth()->user();
        
        return new UserResource($user);
    }

    public function update(Request $request)
    {
        $user = auth()->user();


        /// TO MIDDLEWATE

        $confirmation = $request->input('password');

        //return [Hash::make($confirmation), $user->password];

        if (!!!Hash::check($confirmation, $user->password))
        {
            throw ValidationException::withMessages([
                'password' => 'Icorrect password'
            ]);
        }

        /// TO MIDDLEWATE

        if ($request->has('name'))
            $user->name = $request->input('name');

        if ($request->has('newPassword'))
            $user->password = $request->input('newPassword');

        if ($request->has('email'))
        { 
            $user->email = $request->input('email');
            $user->email_verified_at = null;
            
            // event(new EmailChanged($user));
        }

        $user->save();

        $user->currentAccessToken()->delete();
        $user->withAccessToken($user->createToken('authToken'));

        return new AuthenticatedUserResource($user);
    }

    public function destroy()
    {
        // 
    }
}
