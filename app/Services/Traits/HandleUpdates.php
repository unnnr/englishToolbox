<?php

namespace App\Services\Traits;

use App\Update;

trait HandleUpates 
{
    protected $updateLimit  = 30; 

    protected function createUpdate($post, $description, $title, $thumbnailUrl) : void
    {
        $update = Update::create([
            'thumbnail' =>  $post->createThumbnail()
        ]);
    }

    protected function deleteUpdate($post) : void
    {

    }

    protected function editUpdate($post) : void
    {
        
    }
}