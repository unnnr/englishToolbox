<?php

namespace App\Http\Controllers\Web;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\UploadAudio;

class LoginController extends Controller
{
    public function index()
    {
        return view('auth.login');
    }
}
