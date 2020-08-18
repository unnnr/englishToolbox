<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Video;

class Tag extends Model
{
    const UPDATED_AT = null;

    public $fillable = [
        'label', 'color', 'default'
    ];

    public function videos()
    {
        return $this->morphedByMany(Video::class, 'taggable');
    }
}
