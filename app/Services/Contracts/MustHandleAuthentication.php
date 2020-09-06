<?php

namespace App\Services\Contracts;

use Illuminate\Http\Request;

interface MustHandleAuthentication
{     
    public function register(Request $request);
    
    public function login(Request $request);

    public function logout();
}
