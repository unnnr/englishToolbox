<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Services\VerificationService;
use App\Http\Requests\RegisterUser;
use App\Http\Requests\LoginUser;

class VerificationController extends Controller
{
    public function verifyMail($userID, $hash, Request $request, VerificationService $service)
    {
        return $service->verify($request);
    }
}
