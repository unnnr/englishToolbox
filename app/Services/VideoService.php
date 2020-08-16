<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Alaouy\Youtube\Facades\Youtube;
use App\Http\Requests\UploadVideo;
use App\Services\YoutubeService;
use App\Http\Resources\VideoResource;
use App\Models\Video;


use App\Models\Tag;


class VideoService
{
    public function create(UploadVideo $request)
    {
        $tags = [];
        $tagsId = $request->input('tags', []);
        
        foreach ($tagsId as $id)
            $tags[] = Tag::find($id);

        $videoId = Youtube::parseVidFromURL($request->input('video_url'));
        $info = Youtube::getVideoInfo($videoId, ['snippet']);
       
        $video = Video::create([
            'videoID' => $videoId,
            'title' => $info->snippet->title,
            'description' => $request->input('description')
        ]);

        $video->tags()->saveMany($tags);
        // $video->tags()->saveMany(Tag::all());

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
