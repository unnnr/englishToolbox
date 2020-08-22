<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AudioResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,

            'title' => $this->title,

            'thumbnailUrl' => $this->thumbnail,

            'audioUrl' => $this->videoID,

            'description' => $this->description,

            'mainTag' => new TagResource($this->mainTag()),

            'tags' => TagResource::collection($this->tags)
        ];
    }
}
