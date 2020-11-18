<?php

namespace App\Services\Posts;

use Intervention\Image\ImageManagerStatic as Image;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Services\Contracts\MustHandleFiles;
use App\Services\Traits\HandleFiles;
use App\Services\Posts\PostService;
use App\Http\Resources\AudioResource;
use App\Models\Audio;

class AudioService extends PostService implements MustHandleFiles
{
    use HandleFiles;

    const AUDIO_PATH = 'public/audio';

    const IMAGES_PATH = 'public/audioBackgrounds';

    protected $model = Audio::class;
    
    protected $resource = AudioResource::class;

    protected function getThumbnailUrl(Audio $audio, Request $request) 
    {
        $path = $this->createThumbnail(
            $request->file('imageFile'),
            $audio->imageFile,
            self::BLURED);

        return url($path);
    }

    protected function creating(Request $request)
    { 
        // Creating files
        $audioFileName =  
            $this->storeFile($request->file('audioFile'),  self::AUDIO_PATH);
        
        $imageFileName = 
            $this->storeFile($request->file('imageFile'), self::IMAGES_PATH);
        
        // Retrieving sended data 
        $description = $request->input('description');
        
        $title =  $request->input('title'); 
        
        return Audio::create([
            'title' => $title,
            'description' => $description,
            'audioFile' => $audioFileName,
            'imageFile' => $imageFileName,
        ]);
    }

    protected function updating(Request $request, Audio $post)
    {   
        $data = [];

        if ($request->has('audioFile'))
        {
            $previousFile = $post->audioFile;
            Storage::delete('public/audio/' . $previousFile);

            $fullpath = $request->file('audioFile')->store('public/audio');
            $data['audioFile'] = basename($fullpath);
        }

        if ($request->has('imageFile'))
        {
            $previousFile = $post->imageFile;
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

    protected function deleting(Request $request, Audio $post)
    {
        $imageName = $post->imageFile;
        $audioName =  $post->audioName;

        Storage::delete(self::IMAGES_PATH . $imageName);
        Storage::delete(self::THUMBNAIL_PATH . $imageName);
        Storage::delete(self::AUIDIO_PATH . $audioName);
    }

}
