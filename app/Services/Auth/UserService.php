<?php

namespace App\Services\Auth;

use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\Events\Registered;
use App\Http\Resources\UserResource;
use App\Http\Resources\AuthenticatedUserResource;
use App\Models\User;


class UserService
{

    const REMEMBER_ME = true;

    public function register(Request $request)
    {
        $data = $request->validated();
        
        $user = User::create($data);

        Auth::login($user, self::REMEMBER_ME);
        
        $authToken = $user->createToken('authToken');
        
        $user->withAccessToken($authToken);

        // $user->sendEmailVerificationNotification();
        event(new Registered($user));


        return (new AuthenticatedUserResource($user))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED); 
    }

    
    public function login(Request $request)
    {
        $data = $request->validated();
        if (!!!Auth::attempt($data, self::REMEMBER_ME))
        {
            Auth::user()->currentAccessToken()->delete();
            throw ValidationException::withMessages([
                'password' => 'Password dosn`t match to email'
            ]);
        }

        $user = Auth::user();

        $authToken = $user->createToken('authToken'); 
        
        $user->withAccessToken($authToken);
    
        return new AuthenticatedUserResource($user);
    }

    public function logout()
    {
        Auth::logout();

        return response('', Response::HTTP_NO_CONTENT);
    }

    public function currentUser()
    {
        $user = Auth::user();
        
        return new UserResource($user);
    }
}
