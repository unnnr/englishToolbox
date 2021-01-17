<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\User\ResendEmailVerification;
use App\Http\Requests\User\ResendRecoveryEmail;
use App\Http\Requests\User\ConfirmRecovery;
use App\Http\Requests\User\CreateRecovery;
use App\Http\Requests\User\RegisterUser;
use App\Http\Requests\User\UpdateUser;
use App\Http\Requests\User\DeleteUser;
use App\Http\Requests\User\VerifyUser;
use App\Http\Requests\User\LoginUser;

use App\Services\Auth\VerificationService;
use App\Services\Auth\RecoveryService;
use App\Services\Auth\AuthService;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')
            ->except(['register', 'login']);
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

    public function verifyEmail(VerifyUser $request, VerificationService $service) 
    {
        return $service->verify($request);
    }

    public function resendVerication(ResendEmailVerification $request, VerificationService $service) 
    {
        return $service->resend($request);
    }

    public function createRecovery(CreateRecovery $request, RecoveryService $service) 
    {
        return $service->createCode($request);
    }

    public function changePassword(ConfirmRecovery $request, RecoveryService $service) 
    {
        return $service->confirm($request);
    }

    public function resendRecovery(ResendRecoveryEmail $request, RecoveryService $service) 
    {
        return $service->resend($request);
    }
}