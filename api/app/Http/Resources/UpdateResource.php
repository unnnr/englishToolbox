<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UpdateResource extends JsonResource
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
            // Update data
            'id' => $this->id,
            
            'postType' => $this->type,

            'createdAt' => $this->created_at,

            // Post data          
            'title' => $this->updatable->title,
            
            'description' => $this->updatable->description,  
            
            'thumbnail' => $this->updatable->thumbnail->url,

            'views' => $this->updatable->views,

            'postId' => $this->updatable->id,

            'mainTag' => new TagResource($this->updatable->mainTag),

            'tags' => TagResource::collection($this->updatable->tags)
        ];
    }
}
