<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\VideoService;

class VideoController extends Controller
{
    public function index(VideoService $videoService)
    {
        return view('content.videos');
    }
}
