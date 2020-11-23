<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use App\Models\Contracts\CreatesThumbnail;
use App\Models\Traits\FavoritablePost;
use App\Models\Traits\HasThumbnail;
use App\Models\Traits\HasComments;
use App\Models\Traits\HasUpdates;
use App\Models\Traits\HasTags;


class Audio extends Model implements CreatesThumbnail
{
    use HasTags, HasComments, HasUpdates, HasThumbnail, FavoritablePost;

    public const THUMBNAIL_BLURED = true;
    
    public const AUDIO_PATH = 'public/audio';

    public const IMAGE_PATH = 'public/audioBackgrounds';

    public $defaultTag = 'audio';

    protected $fillable = [
        'title', 'description', 'imageFile', 'audioFile'
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
