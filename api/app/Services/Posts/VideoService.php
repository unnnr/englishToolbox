<?php

namespace App\Services\Posts;

use Illuminate\Http\Request;
use App\Http\Resources\VideoResource;
use App\Models\Video;
use App\Models\Thumbnail;
use App\Services\Posts\PostService;
use App\Services\Traits\HandleYoutubeVideos;

class VideoService extends PostService
{
    use HandleYoutubeVideos;

    protected $model = Video::class;

    protected $resource = VideoResource::class;

    protected function getThumbnailUrl(Video $video) : string
    {
        return $this->youtubeThumbnailPath($video->youtube_id);
    }

    protected function creating(Request $request) : Video
    {
        $url = $request->input('videoUrl');

        $description = $request->input('description');

        $youtubeId = $this->getVideoId($url);

        $title = $this->getVideoTitle($youtubeId);

        return Video::create([
            'title' => $title,
            'youtube_id' => $youtubeId,
            'description'=> $description
        ]);
    }

    protected function updating(Request $request)
    {
        $data = [];

        if ($request->has('videoUrl'))
        {
            $url = $request->input('videoUrl');

            $data['youtubeId'] = $this->getVideoId($url);

            $data['title'] = $this->getVideoTitle($data['videoID']);
        }

        if ($request->has('description'))
            $data['description'] = $request->input('description');

        return $data;
    }
}
