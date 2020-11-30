<?php

namespace App\Models\Traits;

use App\Models\View;

trait HasViews 
{
    public function viewedBy()
    {
        return $this->morphMany(View::class, 'viewable');
    }    
}   