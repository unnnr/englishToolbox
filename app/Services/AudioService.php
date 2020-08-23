<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Http\Resources\AudioResource;
use App\Http\Requests\UploadAudio;
use App\Http\Requests\UpdateAudio;
use App\Models\Audio;

class AudioService
{
    private function createAudio(UploadAudio $request) : Audio
    {
        $fullpath = $request->file('audioFile')->store('public/audio');
        $audioFile = basename($fullpath);
        
        $fullpath = $request->file('imageFile')->store('public/thumbnails');
        $imageFile = basename($fullpath);

        $title =  $request->input('title'); 
        $description = $request->input('description');
        
        return Audio::create([
            'title' => $title,
            'description' => $description,
            'audioFile' => $audioFile,
            'imageFile' => $imageFile,
        ]); 
    }
    
    private function attachTags(Audio $audio, Request $request)
    {
        $tags = $request->input('tags'); 
        $audio->tags()->attach($tags);

        return $tags;
    }

    private function attachMainTag(Audio $audio, Request $request)
    {
        $mainTag = $request->input('mainTag');
        
        if (is_int($mainTag))
            $audio->tags()->attach($mainTag, ['main' => true]);
    }

    public function create(UploadAudio $request)
    {
        $audio = $this->createAudio($request);

        $this->attachTags($audio, $request);
        $this->attachMainTag($audio, $request);

        return new AudioResource($audio);
    }

    public function get()
    {
        
    }

    public function all()
    {
        $all = Audio::all();

        return AudioResource::collection($all);
    }

    public function update(int $id, UpdateAudio $request)
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
    }

    public function delete()
    {

    }
}
