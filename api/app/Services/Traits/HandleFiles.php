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

    public function createThumbnail(object $file, string $fileName, bool $blured = false, ?string $outputDir = self::THUMBNAILS_DIR)
    {
        $thumbnail = Image::make($file->getRealPath());    
        $thumbnail->resize(self::THUMBNAIL_WIDTH, self::THUMBNAIL_HEIGHT);

        if ($blured)
            $thumbnail->blur(25);

       /*  if (is_null($outputDir))
            $outputDir = self::THUMBNAIL_PATH; */

        $path = $outputDir . '/' . $fileName;
        $thumbnail->save(storage_path('app/public/' . $path));

        return 'storage/' . $path;
    }
}
