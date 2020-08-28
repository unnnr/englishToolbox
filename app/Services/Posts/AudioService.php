<?php

namespace App\Services\Posts;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Http\Resources\AudioResource;
use App\Http\Requests\UploadAudio;
use App\Http\Requests\UpdateAudio;
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


   /*  public function update(int $id, UpdateAudio $request)
    {
        $audio = Audio::findOrFail($id);
        
        if ($request->has('title'))
        {
            $title = $request->input('title');
            $audio->title = $title;
        }

        if ($request->has('description'))
        {
            $description = $request->input('description');
            $audio->description = $description;
        }

        if ($request->has('audioFile'))
        {
            $previousFile = $audio->audioFile;
            Storage::delete('public/audio'. $previousFile);

            $fullpath = $request->file('audioFile')->store('public/audio');
            $audioFile = basename($fullpath);

            $audio->audio = $audioFile;
        }

        if ($request->has('imageFile'))
        {
            $previousFile = $audio->imageFile;
            Storage::delete('public/audio'. $previousFile);

            $fullpath = $request->file('imageFile')->store('public/thumbnails');
            $imageFile = basename($fullpath);

            $audio->imageFile = $imageFile;
        }

       
        if ($request->has('tags'))
        {
            $tags = $request->input('tags');

            $audio->tags()->wherePivot('main', null)->detach();
            
            $this->attachTags($audio, $request);
        }

        $mainTag = $request->input('mainTag');
        if ($request->has('mainTag') && $mainTag != $audio->mainTag()->id)
        { 
            $previous = $audio->mainTag();
            if ($previous->default != true)
                $audio->tags()->detach($previous->id);

            $this->attachMainTag($audio, $request);
        }

        $audio->save();

        return new AudioResource($audio);
    } */
}
