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
        // Setting main tag
        $mainTag = null;
        $mainTagId = $request->input('mainTag');

        if (!!!$mainTagId)
            $mainTag = Tag::where(['label' =>'video', 'default' => true])->firstOrFail();
        else 
            $mainTag = Tag::find($mainTag);

        //  Parse tags
        $tags = [];
        $tagsIds = $request->input('tags', []);
        
        foreach ($tagsIds as $id)
            $tags[] = Tag::findOrFail($id);

        
        //  Create video
        $videoId = Youtube::parseVidFromURL($request->input('videoUrl'));
        $info = Youtube::getVideoInfo($videoId, ['snippet']);
        
        $title = $info->snippet->title;
        $description = $request->input('description');
       
        $video = Video::create([
            'title' =>  $title,
            'videoID' => $videoId,
            'description' =>  $description,
        ]);

        $video->tags()->saveMany($tags);
        $video->tags()->save($mainTag);

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
