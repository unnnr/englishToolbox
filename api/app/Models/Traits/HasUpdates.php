<?php

namespace App\Models\Traits;

use App\Models\Update;

trait HasUpdates 
{
    public function updateInstance()
    {
        return $this->morphOne(Update::class, 'updatetable');
    }

    public function convertToUpdate()
    {
        return [
            'title' => $this->title,
            'description' => $this->description,
            'thumbnail_url' => "https://i.ytimg.com/vi/{$this->videoID}/sddefault.jpg"
        ];
    }
}   