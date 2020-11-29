<?php

namespace App\Http\Resources;

use App\Http\Resources\PostResource; 

class AudioResource extends PostResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
		// Default post data
		$post = parent::toArray($request);
	
		// Audio data
		$audio = [
		'audio' => $this->audio,
		'image' =>  $this->image,
		];

        return array_merge($post, $audio);
    }
}
