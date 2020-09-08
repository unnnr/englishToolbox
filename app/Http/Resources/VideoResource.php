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
            'id' => $this->id,

            'title' => $this->title,

            'videoID' => $this->videoID,

            'description' => $this->description,

            'createdAt' => $this->created_at,

            'mainTag' => new TagResource($this->mainTag()),

            'tags' => TagResource::collection($this->tags),

            'createdAt' => $this->created_at
        ];
    }
}
