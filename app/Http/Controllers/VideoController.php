<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\VideoService;
use App\Http\Requests\UploadVideo;

class VideoController extends Controller
{
    public function index()
    {
        return view('content.videos');
    }

    public function create(UploadVideo $request, VideoService $videoService)
    {
        $video = $videoService->create($request);

        return [
            'url' => $video->url,
            'title' => $video->title,
            'description' => $video->description
        ];
    }
}
