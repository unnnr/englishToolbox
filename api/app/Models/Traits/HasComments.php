<?php

namespace App\Models\Traits;

use App\Models\Comments;

trait HasComments 
{
    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }   
}   