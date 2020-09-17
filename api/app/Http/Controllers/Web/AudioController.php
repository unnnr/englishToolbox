<?php

namespace App\Http\Controllers\Web;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\UploadAudio;

class AudioController extends Controller
{
    public function __invoke()
    {
        return view('content.audio');
    }
}
