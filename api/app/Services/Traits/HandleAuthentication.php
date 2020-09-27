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
    protected $authTokenName = 'auth';

    public function register(Request $request)
    {
        $user = User::create($request->validated());

        auth()->login($user);
        
        $authToken = $user->createToken($this->authTokenName); 
        $user->withAccessToken($authToken);

        event(new Registered($user));

        return (new AuthenticatedUserResource($user))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED); 
    }

    
    public function login(Request $request)
    {
        if (!!!Auth::attempt($request->validated()))
        {
            throw ValidationException::withMessages([
                'password' => 'Password doesn`t match to email'
            ]);
        }

        $user = auth()->user();

        $user->tokens('name', $this->authTokenName)->delete();

        $user->withAccessToken($user->createToken('authToken'));
    
        return new AuthenticatedUserResource($user);
    }

    public function logout()
    {
        auth()->logout();
        
        $user->currentAccessToken()->delete();

        return response('', Response::HTTP_NO_CONTENT);
    }
}