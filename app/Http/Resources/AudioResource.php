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

            'audio' => asset('storage/audio/'. $this->audioFile),

            'image' => asset('storage/audioBackgrounds/'. $this->imageFile),

            'thumbnail' => asset('storage/thumbnails/'. $this->imageFile)
        ];
    }
}
