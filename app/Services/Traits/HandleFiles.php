<?php

namespace App\Services\Traits;

use Intervention\Image\ImageManagerStatic as Image;

trait HandleFiles
{     
    public function storeFile(object $file, string $path)
    {
        $fullpath = $file->store($path);

        return basename($fullpath);
    }

    public function createThumbnail(object $file, string $fileName, bool $blured = false, ?string $outputPath = null)
    {
        $thumbnail = Image::make($file->getRealPath());    
        $thumbnail->resize(self::THUMBNAIL_WIDTH, self::THUMBNAIL_HEIGHT);

        if ($blured)
            $thumbnail->blur(25);

        if (is_null($outputPath))
            $outputPath = self::DEFAULT_THUMBNAIL_PATH;

        $path = storage_path('app/' . $outputPath . '/' . $fileName);
        $thumbnail->save($path);

        return $path;
    }
}
