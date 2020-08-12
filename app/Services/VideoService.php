<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use App\Http\Requests\UploadVideo;
use App\Services\YoutubeService;
use App\Models\Video;


class VideoService
{
    public function create(UploadVideo $request)
    {
        $youtube = new YoutubeService();
        $info = $youtube->videoInfo($request->input('videoID'));

        dd($info);
        return Video::create([
            'videoID' => $request->input('videoID'),
            'title' => $info['title'],
            'description' => $request->input('description')
        ]);
    }

    public function get()
    {
        
    }

    public function all()
    {
        return Video::all();
    }

    public function update()
    {

    }

    public function destroy()
    {

    }
}
