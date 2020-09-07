<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Tag;
use App\Models\Comment;
use App\Models\Update;

class Video extends Model
{
    protected $fillable = [
        'videoID', 'title', 'description'
    ];

    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggable')
            ->withPivot('main')->where('main');
    }   

    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }   

    public function updateInstace()
    {
        return $this->morphOne(Update::class, 'updatetable');
    }

    public function mainTag()
    {
        $mainTag = $this->morphToMany(Tag::class, 'taggable')
            ->withPivot('main')
            ->where('main', true)
            ->first();

        if (!!!$mainTag)
            $mainTag = Tag::where(['label' => 'video', 'default' => true])
                ->firstOrFail();
        
        return $mainTag; 
    }
}
