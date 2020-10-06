<?php

namespace App\Services\Traits;

use Alaouy\Youtube\Facades\Youtube;

trait HandleYoutubeVideos 
{
    private function getVideoId(string $url) : string
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

    private function youtubeThumbnailPath($videoId) : string
    {
        return "https://img.youtube.com/vi/{$videoId}/sddefault.jpg";
    }
}