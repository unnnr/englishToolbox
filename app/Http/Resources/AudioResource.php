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

            'description' => $this->description,

            'mainTag' => new TagResource($this->mainTag()),

            'tags' => TagResource::collection($this->tags),

            'thumbnailUrl' => asset('storage/thumbnails/'. $this->thumbnail),

            'audioUrl' => asset('storage/audio/'. $this->audio)
        ];
    }
}
