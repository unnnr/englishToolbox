<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

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

            'created_at' => $this->created_at,

            'sender' => [
                'id' => $this->user->id,
                'name' => $this->user->name
            ]
        ];
    }
}
