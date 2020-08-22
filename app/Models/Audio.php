<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Audio extends Model
{
    protected $fillable = [
        'title', 'description', 'thumbnail', 'audio'
    ];

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
            $mainTag = Tag::where(['label' => 'video', 'default' => true])
                ->firstOrFail();
        
        return $mainTag; 
    }
}
