<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use Alaouy\Youtube\Facades\Youtube;
use App\Http\Requests\UploadVideo;
use App\Http\Requests\UpdateVideo;
use App\Services\YoutubeService;
use App\Http\Resources\VideoResource;
use App\Models\Video;
use App\Models\Tag;


class VideoService
{
    private function getVideoTitle(string $youtubeId) : string
    {
        $info = Youtube::getVideoInfo($youtubeId, ['snippet']);
        
        $title = $info->snippet->title;

        return $title;
    }

    private function attachTags(Video $video, Request $request)
    {
        $tags = $request->input('tags'); 
        $video->tags()->attach($tags);

        return $tags;
    }

    private function attachMainTag(Video $video, Request $request)
    {
        $mainTag = $request->input('mainTag');
        
        if ($mainTag)
            $video->tags()->attach($mainTag, ['main' => true]);
    }

    private function createVideo(UploadVideo $request) : Video
    {
        $videoId = Youtube::parseVidFromURL($request->input('videoUrl'));
        
        $title = $this->getVideoTitle($videoId);

        $description = $request->input('description');
       
        return Video::create([
            'title' =>  $title,
            'videoID' => $videoId,
            'description' =>  $description,
        ]);
    }

    public function create(UploadVideo $request)
    {
        $video = $this->createVideo($request);

        $this->attachTags($video, $request);
        $this->attachMainTag($video, $request);

        return new VideoResource($video);
    }

    public function get(int $id)
    {
        $video = Video::findOrFail($id);

        return new VideoResource($video);
    }

    public function all()
    {
        $videos = Video::all();

        return VideoResource::collection($videos);
    }

    public function update(int $id, UpdateVideo $request)
    {
        $video = Video::findOrFail($id);
        
        $url = $request->input('videoUrl');
        if ($url)
        {
            $videoID = Youtube::parseVidFromURL($url);
            $video->videoID = $videoID;
            
            $title = $this->getVideoTitle($videoID);
            $video->title = $title;
        }

        $description = $request->input('description');
        if ($request->has('description'))
            $video->description = $description;


        $tags = $request->input('tags');
        if ($tags)
        {
            $video->tags()->detach();
            
            $this->attachTags($video, $request);
        }

        $mainTag = $request->input('mainTag');
        if ($mainTag)
        { 
            $previous = $video->mainTag();
            if ($previous->default != true)
                $video->tags()->detach($previous->id);

            $this->attachMainTag($video, $request);
        }

        $video->save();

        return new VideoResource($video);
    }   

    public function destroy()
    {

    }
}
