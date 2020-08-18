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
    private function getMainTag(?int $id) : Tag
    {
        $mainTag = null;

        if (!!!$id)
            $mainTag = Tag::where(['label' =>'video', 'default' => true])->firstOrFail();
        else 
            $mainTag = Tag::find($id);

        return $mainTag;
    }

    private function getTags(?array $ids)
    {
        if (!!!$ids)
            return [];

        $tags = Tag::findMany($ids);

        return $tags;
    }

    private function getVideoTitle(string $youtubeId) : string
    {
        $info = Youtube::getVideoInfo($youtubeId, ['snippet']);
        
        $title = $info->snippet->title;

        return $title;
    }

    public function create(UploadVideo $request)
    {

        // Creating viode
        $videoId = Youtube::parseVidFromURL($request->input('videoUrl'));
        
        $title = $this->getVideoTitle($videoId);

        $description = $request->input('description');
       
        $video = Video::create([
            'title' =>  $title,
            'videoID' => $videoId,
            'description' =>  $description,
        ]);

        // Creating 
        $tags = $this->getTags( $request->input('tags') ); 
        $video->tags()->saveMany($tags);

        $mainTag = $this->getMainTag( $request->input('mainTag') );
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
