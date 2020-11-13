<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserResource; 

class BanResource extends JsonResource
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
            'posted_at' => $this->posted_at,
            'crated_at' => $this->created_at,
    
            'user' => 
                new UserResource($this->user),
        ];
    }
}
