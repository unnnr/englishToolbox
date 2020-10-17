<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Resources\UserResource;

class CommentResource extends JsonResource
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
            
            'message' => $this->message,

            'createdAt' => $this->created_at,

            'user' => [
                'id' => $this->user->id,
                'name' => $this->user->name
            ],

            'post' => [
                'id' => $this->commentable->id,
                'title' => $this->commentable->title
            ]
        ];
    }
}
