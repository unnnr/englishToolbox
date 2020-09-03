<?php

namespace App\Services\Posts;

use Illuminate\Http\Request;
use Alaouy\Youtube\Facades\Youtube;
use App\Http\Resources\VideoResource;
use App\Models\Video;
use App\Services\Posts\PostService;

class VideoService extends PostService
{

    protected $model = Video::class;

    protected $resource = VideoResource::class;

    private function getVideoId(string $url)
    {
        $videoId = Youtube::parseVidFromURL($url);

        return $videoId;
    }

    private function getVideoTitle(string $youtubeId) : string
    {
        $info = Youtube::getVideoInfo($youtubeId, ['snippet']);
        
        $title = $info->snippet->title;

        return $title;
    }

    protected function beforeCreate(Request $request)
    {
        $url = $request->input('videoUrl');

        $description = $request->input('description');

        $videoId = $this->getVideoId($url);

        $title = $this->getVideoTitle($videoId);

        return [
            'title' => $title,
            'videoID' => $videoId,
            'description'=> $description
        ];
    }

    protected function beforeUpdate(Request $request)
    {
        $data = [];

        if ($request->has('videoUrl'))
        {
            $url = $request->input('videoUrl');

            $data['videoID'] = $this->getVideoId($url);

            $data['title'] = $this->getVideoTitle($data['videoID']);
        }

        if ($request->has('description'))
            $data['description'] = $request->input('description');

        return $data;
    }
}
