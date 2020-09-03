<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Audio extends Model
{
    protected $fillable = [
        'title', 'description', 'imageFile', 'audioFile'
    ];

    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggable')
            ->withPivot('main')->where('main');
    }   

    public function comments()
    {
        return $this->morphMany('App\Comment', 'commentable');
    }

    public function mainTag()
    {
        $mainTag = $this->morphToMany(Tag::class, 'taggable')
            ->withPivot('main')
            ->where('main', true)
            ->first();

        if (!!!$mainTag)
            $mainTag = Tag::where(['label' => 'audio', 'default' => true])
                ->firstOrFail();
        
        return $mainTag; 
    }
}
