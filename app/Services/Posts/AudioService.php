<?php

namespace App\Services\Posts;

use Intervention\Image\ImageManagerStatic as Image;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Http\Resources\AudioResource;
use App\Models\Audio;
use App\Services\Traits\HandleFiles;
use App\Services\Posts\PostService;
use App\Services\Contracts\MustHandleFiles;


class AudioService extends PostService implements MustHandleFiles
{
    use HandleFiles;

    const AUDIO_PATH = 'public/audio';

    const IMAGES_PATH = 'public/audioBackgrounds';

    protected $model = Audio::class;
    
    protected $resource = AudioResource::class;

    protected function createUpdateInfo(Audio $post) 
    {
        return [
            'title' => $post->title,
            'description' => $post->description,
            'thumbnail_url' => self::THUMBNAIL_PATH + $post->imageFile
        ];
    }

    protected function beforeCreate(Request $request)
    { 
        // Creating files
        $audioFileName =  $this->storeFile($request->file('audioFile'),  self::AUDIO_PATH);
        
        $imageFileName = $this->storeFile($request->file('imageFile'), self::IMAGES_PATH);
        
        $this->createThumbnail($request->file('imageFile'), $imageFileName, self::BLURED);
        
        // Retrieving sended data 
        $description = $request->input('description');
        
        $title =  $request->input('title'); 
        
        return [
            'title' => $title,
            'description' => $description,
            'audioFile' => $audioFileName,
            'imageFile' => $imageFileName,
        ];
    }

    protected function beforeUpdate(Request $request, Audio $element)
    {   
        $data = [];

        if ($request->has('audioFile'))
        {
            $previousFile = $element->audioFile;
            Storage::delete('public/audio/' . $previousFile);

            $fullpath = $request->file('audioFile')->store('public/audio');
            $data['audioFile'] = basename($fullpath);
        }

        if ($request->has('imageFile'))
        {
            $previousFile = $element->imageFile;
            Storage::delete(self::IMAGES_PATH . $previousFile);
            Storage::delete(self::THUMBNAIL_PATH . $previousFile);

            $fullpath = $request->file('imageFile')->store('public/thumbnails');
            $data['imageFile'] = basename($fullpath);
        }

        if ($request->has('title'))
           $data['title'] = $request->input('title'); 

        if ($request->has('description'))
           $data['description'] = $request->input('description'); 

        return $data;
    }

    protected function beforeDelete(Request $request, Audio $element)
    {
        $imageName = $element->imageFile;
        $audioName =  $element->audioName;

        Storage::delete(self::IMAGES_PATH . $imageName);
        Storage::delete(self::THUMBNAIL_PATH . $imageName);
        Storage::delete(self::AUIDIO_PATH . $audioName);
    }
}
