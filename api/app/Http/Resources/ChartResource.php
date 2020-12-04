<?php

namespace App\Http\Resources;

use App\Http\Resources\PostResource; 

class ChartResource extends PostResource
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
	
		// Cahrt data
		$chart = [
		    'image' => $this->imageUrl,
		];

        return array_merge($post, $chart);
    }
}
