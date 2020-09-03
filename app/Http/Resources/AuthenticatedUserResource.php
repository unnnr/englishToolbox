<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AuthenticatedUserResource extends JsonResource
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

            'name' => $this->name,

            'email' => $this->email,

            'verified' => $this->hasVerifiedEmail(),
    
            'authToken' => $this->currentAccessToken()->plainTextToken,

            'admin' => true
        ];
    }
}