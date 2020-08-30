<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Services\UserService;
use App\Http\Requests\RegisterUser;
use App\Http\Requests\LoginUser;

class UserController extends Controller
{
    public function __construct()
    {
    }
    
    public function register(RegisterUser $request, UserService $service)
    {
        return $service->register($request);
    }

    public function login(LoginUser $request, UserService $service)
    {
        return $service->register($request);
    }

    public function logout()
    {

    }
}
