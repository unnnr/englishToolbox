<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\TagsResource; 

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
            'title' => $this->title,

            'videoID' => $this->videoID,

            'description' => $this->description,

            'tags' => TagResource::collection($this->tags)
        ];
    }
}
