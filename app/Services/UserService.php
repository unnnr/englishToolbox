<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Resources\UserResource;
use App\Models\User;


class UserService
{
    public function register(Request $request)
    {
        $data = $request->validated();
        
        $user = User::create($data);

        //$authToken = $user->createToken('authToken')->plainTextToken;
        
        Auth::login($user, self::REMEMBER_ME);

        return (new UserResource($user))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED); 
    }

    
    public function login(Request $request)
    {
        $data = $request->validated();

        if (!!!Auth::attempt($data, self::REMEMBER_ME))
            throw ValidationException::withMessages([
                'password' => 'Password dosn`t match to email'
            ]);

        $user = Auth::user();

        // Refresh token
        
        return new UserResource($user);
    }

    const REMEMBER_ME = true;
}
