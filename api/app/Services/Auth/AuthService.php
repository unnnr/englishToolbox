<?php

namespace App\Services\Auth;

use Symfony\Component\HttpFoundation\Response;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;

use App\Http\Resources\AuthenticatedUserResource;
use App\Http\Resources\UserResource;
use App\Models\User;

use Illuminate\Support\Facades\Auth;

class AuthService
{
    protected $authTokenName = 'auth';

    public function register(Request $request)
    {
        $user = User::create($request->validated());
        
        $user->withAccessToken(
            $user->createToken($this->authTokenName)
        );

        $user->avatar()->create([
        ]);

        event(new Registered($user));

        return (new AuthenticatedUserResource($user))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED); 
    }

    
    public function login(Request $request)
    {
        $credionals = $request->only('email', 'password');

        if (!!!auth()->attempt($credionals))
        {
            throw ValidationException::withMessages([
                $this->username() => [trans('auth.failed')]
            ]);
        }

        $user = auth()->user();
        $user->tokens('name', $this->authTokenName)->delete();
        $user->withAccessToken(
            $user->createToken($this->authTokenName)
        );
    
        return new AuthenticatedUserResource($user);
    }

    public function logout()
    {        
        auth()->user()->currentAccessToken()->delete();

        return response('', Response::HTTP_NO_CONTENT);
    }
}