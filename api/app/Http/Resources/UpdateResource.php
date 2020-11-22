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
            'id' => $this->id,

            'title' => $this->updatable->title,

            'description' => $this->updatable->description,  

            'thumbnail' => $this->updatable->thumbnail->url,

            'createdAt' => $this->created_at
        ];
    }
}
