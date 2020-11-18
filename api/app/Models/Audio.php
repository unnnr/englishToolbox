<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\FavoritablePost;
use App\Models\Traits\HasThumbnail;
use App\Models\Traits\HasComments;
use App\Models\Traits\HasUpdates;
use App\Models\Traits\HasTags;

class Audio extends Model
{
    use HasTags, HasComments, HasThumbnail, HasUpdates, FavoritablePost;

    protected $fillable = [
        'title', 'description', 'imageFile', 'audioFile'
    ];

    protected $defaultTag = 'audio';

    public function getAudioAttribute()
    {
        return url('storage/audio/' . $this->audioFile);
    } 

    public function getImageAttribute()
    {
        return url('storage/audioBackgrounds/' . $this->imageFile);
    } 
}
