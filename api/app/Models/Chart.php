<?php

namespace App\Models;

use Illuminate\Support\Facades\Storage;
use App\Models\Contracts\CreatesThumbnail;

class Chart extends Post implements CreatesThumbnail
{
    public const IMAGE_PATH = 'public/charts';

    public const DEFAULT_TAG = 'chart';

    protected $type = 'charts';

    protected $fillable = [
        'title', 'description', 'image', 'views'
    ];
    
    public function getImageUrlAttribute()
    {
        return url(Storage::url(self::IMAGE_PATH.'/'.$this->image));
    } 
}