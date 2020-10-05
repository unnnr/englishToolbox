<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\TagResource; 

class VideoResource extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            // Main data
            'id' => $this->id,

            'title' => $this->title,

            'youtubeId' => $this->youtube_id,

            'description' => $this->description,

            'createdAt' => $this->created_at,

            // Additional
            'thumbnail' => $this->thumbnail->url,

            // Tags
            'mainTag' => new TagResource($this->mainTag()),

            'tags' => TagResource::collection($this->tags)
        ];
    }
}
