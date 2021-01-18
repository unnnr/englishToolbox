<?php

namespace App\Services;

use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Http\Resources\AuthenticatedUserResource;
use App\Http\Resources\UserResource;
use App\Events\EmailChanged;
use App\Models\User;


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
    
    public function destroy(Request $request)
    {
        $user = auth()->user();
        $user->currentAccessToken()->delete();
        
        // Removing one to one relationship
        $avatar = $user->avatar;
        Storage::delete($user->avatar::STORAGE_PATH .'/'. $avatar->name);
        $user->avatar->delete();  
        
        $ban = $user->ban;
        if ($ban) {
            $ban->user_id = null;
            $ban->update();
        }

        // Removing one to many relationship
        $user->verificationCodes()->delete();
        $user->comments()->delete();
        $user->tokens()->delete();
        $user->views()->delete();

        $user->delete();
    }
}
