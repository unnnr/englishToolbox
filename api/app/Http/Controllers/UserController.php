<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Http\Requests\User\RegisterUser;
use App\Http\Requests\User\LoginUser;
use App\Http\Requests\User\UpdateUser;
use App\Http\Requests\User\DeleteUser;
use App\Http\Middleware\RequirePassword;
use App\Services\UserService;


class UserController extends Controller
{

    private $service;

    public function __construct()
    {
        $this->service = new UserService();

        $this->middleware('auth:sanctum');
        $this->middleware(RequirePassword::class)
            ->only(['update', 'destroy']);
    }

    public function index()
    {
        return $this->service->currentUser();
    }

    public function update(UpdateUser $request)
    {
        return $this->service->update($request);
    }
    
    public function destroy(DeleteUser $request)
    {
        return $this->service->destroy($request);
    }
}
