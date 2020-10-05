<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\RegisterUser;
use App\Http\Requests\User\LoginUser;
use App\Http\Requests\User\UpdateUser;
use App\Http\Requests\User\DeleteUser;
use App\Services\UserService;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->only([
            'index', 'update', 'destroy'
        ]);
    }
    
    public function register(UserService $service, RegisterUser $request)
    {
        return $service->register($request);
    }

    public function login(UserService $service, LoginUser $request)
    {
        return $service->login($request);
    }

    public function logout(UserService $service)
    {
        return $service->logout();
    }

    public function index(UserService $service)
    {
        return $service->currentUser();
    }

    public function update(UserService $service, UpdateUser $request)
    {
        return $service->update($request);
    }
    
    public function destroy(UserService $service, DeleteUser $request)
    {
        return $service->update($request);
    }

}
