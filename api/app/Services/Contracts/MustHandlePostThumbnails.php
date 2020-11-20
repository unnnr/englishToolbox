<?php

namespace App\Services\Contracts;

interface MustHandlePostThumbnails
{     
    public const THUMBNAIL_DIR =  'thumbnails';

    public const THUMBNAIL_PATH = 'public/thumbnails';

    public const THUMBNAIL_WIDTH = 300;
    
    public const THUMBNAIL_HEIGHT = 168.75;

    public const THUMBNAIL_BLURED = false;

    public function storeFile(object $file, string $path);

    public function createThumbnail(object $file, string $fileName, bool $blured = false, string $outputPath);
}
