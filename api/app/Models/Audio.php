<?php

namespace App\Models;

use Illuminate\Support\Facades\Storage;
use App\Models\Contracts\CreatesThumbnail;

class Audio extends Post implements CreatesThumbnail
{
    public const THUMBNAIL_BLURED = true;
    
    public const AUDIO_PATH = 'public/audio';

    public const IMAGE_PATH = 'public/audioBackgrounds';

    public const DEFAULT_TAG = 'audio';

    protected $type = 'audio';

    protected $fillable = [
        'title', 'description', 'imageFile', 'audioFile', 'views'
    ];

    public function getAudioAttribute()
    {
        return url(Storage::url(self::AUDIO_PATH.'/'.$this->audioFile));
    } 

    public function getImageAttribute()
    {
        return url(Storage::url(self::IMAGE_PATH.'/'.$this->imageFile));
    } 
}
