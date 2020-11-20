<?php

namespace App\Models\Contracts;

interface CreatesThumbnail 
{
    public const THUMBNAIL_PATH = 'public/thumbnails';

    public const THUMBNAIL_WIDTH = 300;
    
    public const THUMBNAIL_HEIGHT = 168.75;
}