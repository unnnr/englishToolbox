<?php

namespace App\Models\Traits;

use App\Models\Thumbnail;

trait HasThumbnail
{
    public function thumbnail()
    {
        return $this->morphOne(Thumbnail::class, 'thumbnailable');
    }   
}   