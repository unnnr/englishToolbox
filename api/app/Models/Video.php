<?php

namespace App\Models;

class Video extends Post
{
    public const DEFAULT_TAG = 'video';

    protected $type = 'videos';

    protected $fillable = [
        'youtube_id', 'title', 'description', 'views'
    ];
}
