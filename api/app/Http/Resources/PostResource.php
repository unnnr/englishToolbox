<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
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

            'description' => $this->description,

            'createdAt' => $this->created_at,

            // Additional
            'thumbnail' => $this->thumbnail->url,

            'views' => $this->views,

            // Tags
            'mainTag' => new TagResource($this->mainTag),

            'tags' => TagResource::collection($this->tags)
        ];
    }
}
