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

    protected function updating(Request $request, Audio $audio)
    {   
        if ($request->has('audioFile'))
        {
            // Removing previous audio file
            Storage::delete(self::AUDIO_PATH .'/'. $audio->audioFile);

            // Storing new file and updating model
            $audio->audioFile = 
                $this->storeFile($request->file('audioFile'), self::AUDIO_PATH);
        }

        if ($request->has('imageFile'))
        {
            // Removing previous image file and thumbnail
            Storage::delete(self::IMAGES_PATH .'/'. $audio->imageFile);
            Storage::delete(self::THUMBNAILS_PATH .'/'. $audio->imageFile);

            // Storing new image and updating model
            $audio->imageFile = 
                $this->storeFile($request->file('imageFile'), self::IMAGES_PATH);

            // Creating new thumbnail and updating model
            $audio->thumbnail()->update([
                'url' => $this->getThumbnailUrl($audio, $request)
            ]);
        }

        if ($request->has('title'))
            $audio->title = $request->input('title'); 

        if ($request->has('description'))
            $audio->description = $request->input('description'); 

        $audio->save();
    }

    protected function deleting(Request $request, Audio $post)
    {
        $imageName = $post->imageFile;
        $audioName =  $post->audioName;

        Storage::delete(self::IMAGES_PATH . $imageName);
        Storage::delete(self::THUMBNAILS_PATH . $imageName);
        Storage::delete(self::AUIDIO_PATH . $audioName);
    }

}
