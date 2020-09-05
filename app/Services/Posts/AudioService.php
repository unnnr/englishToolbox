<?php

namespace App\Services\Posts;

use Intervention\Image\ImageManagerStatic as Image;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Http\Resources\AudioResource;
use App\Models\Audio;

use App\Services\Posts\PostService;


class AudioService extends PostService
{

    protected $model = Audio::class;
    
    protected $resource = AudioResource::class;

    protected function beforeCreate(Request $request)
    {
        $fullpath = $request->file('audioFile')->store('public/audio');
        $audioFile = basename($fullpath);
        
        $fullpath = $request->file('imageFile')->store('public/thumbnails');
        $imageFile = basename($fullpath);

        $title =  $request->input('title'); 
        $description = $request->input('description');

        return [
            'title' => $title,
            'description' => $description,
            'audioFile' => $audioFile,
            'imageFile' => $imageFile,
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
            Storage::delete('public/thumbnails/' . $previousFile);

            $fullpath = $request->file('imageFile')->store('public/thumbnails');
            $data['imageFile'] = basename($fullpath);
        }

        if ($request->has('title'))
           $data['title'] = $request->input('title'); 

        if ($request->has('description'))
           $data['description'] = $request->input('description'); 


        return $data;
    }
}
