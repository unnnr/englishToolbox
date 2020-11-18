<?php

namespace App\Http\Resources;

use App\Http\Resources\PostResource; 

class VideoResource extends PostResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        // Default post data
        $post = parent::toArray($request);
        
        // Videos data
        $video = [
            'youtubeId' => $this->youtube_id
        ];

        return array_merge($post, $video);
    }
}