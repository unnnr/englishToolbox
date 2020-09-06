<?php

namespace App\Services\Traits;

use Symfony\Component\HttpFoundation\Response;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;

use App\Http\Resources\AuthenticatedUserResource;
use App\Http\Resources\UserResource;
use App\Models\User;

use Illuminate\Support\Facades\Auth;

trait HandleAuthentication
{
    public function register(Request $request)
    {
        $data = $request->validated();
        $user = User::create($data);

        auth()->login($user, self::REMEMBER_ME);
        
        $authToken = $user->createToken('authToken'); 
        $user->withAccessToken($authToken);

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
            throw ValidationException::withMessages([
                'password' => 'Password dosn`t match to email'
            ]);
        }

        $user =  auth()->user();
        $authToken = $user->createToken('authToken');    
        $user->withAccessToken($authToken);
    
        return new AuthenticatedUserResource($user);
    }

    public function logout()
    {
        auth()->logout();

        return response('', Response::HTTP_NO_CONTENT);
    }
}