<?php

namespace App\Http\Controllers\Web;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\UploadAudio;

class ProfileController extends Controller
{

    public function __construct()
    {
        $this->middleware('guest');
    }

    public function __invoke()
    {
        return view('profile');  
    }
}
