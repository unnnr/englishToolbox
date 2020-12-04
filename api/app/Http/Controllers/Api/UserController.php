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

    private $service = null;

    public function __construct()
    {
        $this->middleware('auth:sanctum');

        $this->service = new UserService();
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
        return $this->service->update($request);
    }
}
