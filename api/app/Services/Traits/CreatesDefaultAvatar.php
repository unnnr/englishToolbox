<?php

namespace App\Services\Traits;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use App\Models\Avatar;

trait CreatesDefaultAvatar
{     
    private function randomColor($from = 40, $to = 250, $difference = 20) {
        $first = rand($from, $to);
        $second = rand($from, $to);
  
        // One of the three nodes must be different from the others.
        // So if 'first node' and 'second node' are similar
        // we need to ensure that third will be different
        if (abs($first - $second) < $difference) {
          $average = ($first + $second) / 2;
  
          // To generate different from first and second value
          // we need to pick it from two ranges
          // [FROM, average - DIFFERENCE] U [average + DIFFERENCE, TO]
          
          // By default  DIFFERENCE * 2 < TO - FROM, 
          // so we dont consider other cases
  
          if ($average + $difference <= $to)
            $third = 
              rand($average + $difference, $to);
          else 
            $third = 
              rand($from, $average - $difference);
        }
        else 
          $third = rand($from, $to);
        
        return "rgb({$first}, {$second}, {$third})";
    }

    private function randomAvatarName() {
        do {
            $name = '/default_' . Str::random(40) . '.svg';
            $path = Storage::path(Avatar::STORAGE_PATH . $name);
        }
        while (file_exists($path));

        return $path;
    } 

    private function createAvatar() {
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