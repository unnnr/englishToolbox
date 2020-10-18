<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\HasThumbnail;
use App\Models\Traits\HasComments;
use App\Models\Traits\HasUpdates;
use App\Models\Traits\HasTags;


class Video extends Model
{
    use HasTags, HasComments, HasThumbnail, HasUpdates;

    protected $fillable = [
        'youtube_id', 'title', 'description'
    ];

    protected $defaultTag = 'video';
}
