<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\HasTags;
use App\Models\Traits\HasComments;
use App\Models\Traits\HasUpdates;

class Video extends Model
{
    use HasTags, HasComments;

    protected $fillable = [
        'videoID', 'title', 'description'
    ];

    protected $defaultTag = 'video';
}
