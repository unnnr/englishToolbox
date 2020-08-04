<?php

namespace App\Services;
use App\Http\Requests\UploadVideo;
use App\Models\Video;


class VideoService
{
    public function create(UploadVideo $request)
    {
        return Video::create([
            'title' => 'video №' . Video::count(),
            'url' => $request->input('url')
        ]);
    }

    public function get()
    {
        
    }

    public function all()
    {

    }

    public function update()
    {

    }

    public function delete()
    {

    }
}
