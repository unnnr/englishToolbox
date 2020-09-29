<?php

namespace App\Models\Traits;

use App\Models\Tag;

trait HasTags 
{
    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggable')
            ->withPivot('main')->where('main');
    }    

    public function mainTag()
    {
        $mainTag = $this->morphToMany(Tag::class, 'taggable')
            ->withPivot('main')
            ->where('main', true)
            ->first();

        if (!!!$mainTag)
        {
            $mainTag = Tag::where([
                'label' => $this->defaultTag,
                'default' => true
            ])->firstOrFail();
        }
        
        return $mainTag; 
    }
}   