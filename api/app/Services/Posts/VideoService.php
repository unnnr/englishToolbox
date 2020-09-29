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

    protected function updating(Request $request, Video $video) : void
    {
        if ($request->has('videoUrl'))
        {
            $url = $request->input('videoUrl');

            $video->youtube_id = $this->getVideoId($url);

            $video->title = $this->getVideoTitle($video->youtube_id);

            $video->thumbnail()->update([
                'url' => $this->getThumbnailUrl($video)
            ]);
        }

        if ($request->has('description'))
            $video->description = $request->input('description');

        $video->save();
    }
}
