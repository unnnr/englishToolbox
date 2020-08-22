<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Http\Resources\AudioResource;
use App\Http\Requests\UploadAudio;
use App\Models\Audio;

class AudioService
{
    private function createAudio(UploadAudio $request) : Audio
    {
        $fullpath = $request->file('audio')->store('public/audio');
        $audio = basename($fullpath);
        
        $fullpath = $request->file('thumbnail')->store('public/thumbnails');
        $thumbnail = basename($fullpath);

        $title =  $request->input('title'); 
        $description = $request->input('description');

        return Audio::create([
            'title' => $title,
            'description' => $description,
            'audio' => $audio,
            'thumbnail' => $thumbnail,
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

    public function update()
    {

    }

    public function delete()
    {

    }
}
