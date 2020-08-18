<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Tag;

class Video extends Model
{
    protected $fillable = [
        'videoID', 'title', 'description'
    ];

    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggable')
            ->withPivot('main');
    }   

    public function mainTag()
    {
        // firstOrFail()  
        return $this->tags()->where('default', true)->first();
    }
}
