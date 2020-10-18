<?php

namespace App\Models\Traits;

use App\Models\Update;

trait HasUpdates 
{
    public function updateInstance()
    {
        return $this->morphOne(Update::class, 'updatable');
    }
}   