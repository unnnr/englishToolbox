<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UploadAudio;
use App\Service\AudioService;

class AudioController extends Controller
{
    public function index()
    {
        return view('content.audio');
    }

    public function store(UploadAudio $request)
    {
        $audio = AudioService($request);

        return [
            'title' => $audio->title,
            'description' => $audio->description,
            'path' => asset('storage/img/' . $audio->filename)
        ];
    }
}
