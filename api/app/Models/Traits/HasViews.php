<?php

namespace App\Models\Traits;

use App\Models\View;

trait HasViews 
{
    public function Views()
    {
        return $this->morphMany(View::class, 'viewable');
    }    
}   