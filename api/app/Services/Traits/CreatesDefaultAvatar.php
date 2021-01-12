<?php

namespace App\Services\Traits;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use App\Models\Avatar;

use Illuminate\Support\Facades\Log;

trait CreatesDefaultAvatar
{     
    public function randomColor($saturation = 60, $lightness = 60, $count = 1000) : string
    {
        // Range of colors cut out of the spectrum 
        $cutFrom = 60;
        $cutTo = 160;
        
        // Range without cutout part  
        $range = 360 - $cutTo + $cutFrom;
        
        $hue = rand(0, $count) * ($range / $count) % $range;

        // Moving hue 
        if ($hue > $cutFrom)
            $hue += $cutTo - $cutFrom;

        return "hsl({$hue}, {$saturation}%, {$lightness}%)";
    }

    private function randomAvatarName() : string
    {
        do {
            $name = '/default_' . Str::random(40) . '.svg';
            $path = Storage::path(Avatar::STORAGE_PATH . $name);
        }
        while (file_exists($path));

        return $path;
    } 

    private function createAvatar() : string
    {
        $color = self::randomColor();
        $name = self::randomAvatarName();

        $defaultAvatar =  
            Storage::get(Avatar::PRESET_PATH);

        $anchor = '/(id="background")/';
        $replacement = "$1 fill=\"{$color}\"";
        
        $newAvatar = 
            preg_replace($anchor, $replacement, $defaultAvatar, 1);

        File::put($name, $newAvatar);

        return basename($name);
    }
}