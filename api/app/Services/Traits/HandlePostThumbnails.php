<?php

namespace App\Services\Traits;

use Intervention\Image\ImageManagerStatic as Image;
use Illuminate\Support\Facades\Storage;

trait HandlePostThumbnails
{     
    public function storeFile(object $file, string $path)
    {
        $fullpath = $file->store($path);

        return basename($fullpath);
    }

    public function storeThumbnail(object $file, string $fileName, object $post)
    {
        $thumbnail = Image::make($file->getRealPath());    
        
        // Resizing
        $thumbnail->resize($post::THUMBNAIL_WIDTH,
                           $post::THUMBNAIL_HEIGHT);

        // Bluring
        if (defined(get_class($post).'::THUMBNAIL_BLURED') && $post::THUMBNAIL_BLURED)
            $thumbnail->blur(25);
        
        // Saving
        $path = $post::THUMBNAIL_PATH.'/'.$fileName;
        $thumbnail->save(storage_path('app/'.$path));

        return url(Storage::url($path));
    }
}