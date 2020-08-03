<?php

namespace App\Services;

use App\Http\Requests\UploadAudio;
use App\Models\Audio;

class AudioService
{

    public function create(UploadAudio $request)
    {
        $fullpath = $request->file('audio')
                            ->store('public/audio');

        $title =  $request->input('title'); 
        $description = $request->input('description');

        $filename = basename($fullpath);

        return  Audio::create([
            'title' => $title,
            'description' => $description,
            'filename' => $filename
        ]); 
    }

    public function get()
    {
        
    }

    public function all()
    {

    }

    public function update()
    {

    }

    public function delete()
    {

    }
}
