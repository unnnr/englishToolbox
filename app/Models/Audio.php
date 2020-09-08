<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Update;
use App\Models\Comment;

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
        return $this->morphMany(Comment::class, 'commentable');
    }

    
    public function updateInstance()
    {
        return $this->morphOne(Update::class, 'updatetable');
    }


    public function convertToUpdate()
    {
        return [
            'title' => $this->title,
            'description' => $this->description,
            'thumbnail_url' => $this->imageFile
        ];
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
