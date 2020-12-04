<?php

namespace App\Models\Traits;

use App\Models\Tag;

trait HasTags 
{
    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggable')
            ->wherePivot('main', null);
    }    

    public function getMainTagAttribute() {
        $main = $this->morphToMany(Tag::class, 'taggable')
            ->withPivot('main')
            ->where('main', 1)
            ->first();

        if ($main)
            return $main;

        $default = (object) [
            'id' => 12,
            'label' => 'んゃし',
            'color' => 'darkgray',
            'default' => true,
        ];
        return $default;
    }
}   