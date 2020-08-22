<?php

namespace App\Http\Controllers\Web;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\VideoService;

class VideoController extends Controller
{
    public function index(VideoService $videoService)
    {
        return view('content.videos');
    }
}
