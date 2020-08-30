<?php

namespace App\Http\Controllers;

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
        $this->middleware('auth')->except(['register', 'login']);
    }
    
    public function register(RegisterUser $request, UserService $service)
    {
        return $service->register($request);
    }

    public function login(LoginUser $request, UserService $service)
    {
        return $service->login($request);
    }

    public function logout(UserService $service)
    {
        return $service->logout();
    }

    public function profile(UserService $service)
    {
        return $service->currentUser();
    }
}
