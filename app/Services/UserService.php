<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Resources\UserResource;
use App\Models\User;


class UserService
{
    public function register(Request $request)
    {
        $data = $request->validated();
        
        $user = User::create($data);

        $authToken = $user->createToken('authToken')->plainTextToken;
        
        Auth::login($user);
        
        return (new UserResource($user))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED); 
    }

    
    public function login(Request $request)
    {
        if (!!!Auth::attempt($data));
            return response()
                ->setStatusCode(Response::HTTP_BAD_REQUEST);

        return response()
            ->setStatusCode(Response::HTTP_OK);
    }
}
