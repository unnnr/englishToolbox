<?php

namespace App\Services\Traits;

use Intervention\Image\ImageManagerStatic as Image;

trait HandlePostThumbnails
{     
    public function storeFile(object $file, string $path)
    {
        $fullpath = $file->store($path);

        return basename($fullpath);
    }

    public function createThumbnail(
        object $file,
        string $fileName,
        string $outputDir = self::THUMBNAIL_DIR,
        int $width = self::THUBMNAIL_WIDTH,
        int $height = self::THUBMNAIL_HEIGHT,
        bool $blured = self::THUMBNAIL_BLURED)
    {
        $thumbnail = Image::make($file->getRealPath());    
        $thumbnail->resize($width, $height);

        if ($blured)
            $thumbnail->blur(25);

        $path = $outputDir . '/' . $fileName;
        $thumbnail->save(storage_path('app/public/' . $path));

        return 'storage/' . $path;
    }
}
