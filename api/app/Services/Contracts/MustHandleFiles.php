<?php

namespace App\Services\Contracts;

interface MustHandleFiles
{     
    public const THUMBNAIL_PATH =  'public/thumbnails';

    public const THUMBNAIL_WIDTH = 300;
    
    public const THUMBNAIL_HEIGHT = 168.75;

    public const BLURED = true;

    public function storeFile(object $file, string $path);

    public function createThumbnail(object $file, string $fileName, bool $blured = false, string $outputPath);
}
