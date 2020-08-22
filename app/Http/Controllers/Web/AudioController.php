<?php

namespace App\Http\Controllers\Web;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\UploadAudio;
use App\Service\AudioService;

class AudioController extends Controller
{
    public function index()
    {
        return view('content.audio');
    }
}
