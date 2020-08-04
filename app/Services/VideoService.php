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
            'description' => $request->input('description'),
            'url' => $request->input('url')
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

    public function delete()
    {

    }
}
