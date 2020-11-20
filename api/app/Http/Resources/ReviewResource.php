<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ReviewResource extends JsonResource
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

            'grade' => $this->grade,

            'verified' => $this->verified,
            
            'title' => $this->title,

            'text' => $this->text,

            'user' => [
                'avatar' => $this->avatarUrl,
                'name' => $this->user_name,
            ]
        ];
    }
}
