<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use App\Http\Requests\UploadVideo;
use App\Services\YoutubeService;
use App\Http\Resources\VideoResource;
use App\Models\Video;


class VideoService
{
    public function create(UploadVideo $request)
    {
        $youtube = new YoutubeService();

        $info = $youtube->videoInfo($request->input('videoID'));

        $video = Video::create([
            'videoID' => $request->input('videoID'),
            'title' => $info['title'],
            'description' => $request->input('description')
        ]);

        return new VideoResource($video);
    }

    public function get(int $id)
    {
        $video = Video::find($id);

        if(!!!$video)
            return null;
            
        return new VideoResource($video);
    }

    public function all()
    {
        $videos = Video::all();

        return VideoResource::collection($videos);
    }

    public function update()
    {

    }

    public function destroy()
    {

    }
}
