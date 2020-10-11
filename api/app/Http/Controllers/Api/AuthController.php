<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\RegisterUser;
use App\Http\Requests\User\LoginUser;
use App\Http\Requests\User\UpdateUser;
use App\Http\Requests\User\DeleteUser;
use App\Services\Auth\AuthService;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->only('logout');
    }
    
    public function register(AuthService $service, RegisterUser $request)
    {
        return $service->register($request);
    }

    public function login(AuthService $service, LoginUser $request)
    {
        return $service->login($request);
    }

    public function logout(AuthService $service)
    {
        return $service->logout();
    }
}