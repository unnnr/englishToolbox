<?php

namespace App\Models\Traits;

use App\Models\Video;
use App\Models\Audio;


trait HasFavoritePosts 
{
    public function favoriteVideos() 
    {
        return $this->morphedByMany(Video::class, 'favoritable');
    }

    public function favoriteAudio() 
    {
        return $this->morphedByMany(Audio::class, 'favoritable');
    }
    public function favoriteCharts() 
    {
        return $this->morphedByMany(Audio::class, 'favoritable');
    }

    public function getFavoritesAttribute() 
    {
        $favorites[] = $this->favoriteCharts;
        $favorites[] = $this->favoriteVideo;
        $favorites[] = $this->favoriteAudio;

        return collect($favorites)->collapse();
    }
}