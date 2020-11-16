<?php

namespace App\Models\Traits;

use App\Models\Video;
use App\Models\Audio;


trait HasFavoritePosts 
{
    public function favoriteVideo() 
    {
        return $this->morphedByMany(Video::class, 'favoritable');
    }

    public function favoriteAudio() 
    {
        return $this->morphedByMany(Audio::class, 'favoritable');
    }

    public function getFavoritesAttribute() 
    {
        $favorites[] = $this->favoriteVideo;
        $favorites[] = $this->favoriteAudio;

        return collect($favorites)->collapse();
    }
}