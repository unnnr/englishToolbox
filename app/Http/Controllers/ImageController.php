<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UploadImage;
use App\Models\Image;

class ImageController extends Controller
{
    public function index()
    {
        return view('content.images', ['posts' => Image::limit(10)->get()]);
    }

    public function store(UploadImage $request)
    {
        $fullpath = $request->file('image')->store('public/img');
        $filename = basename($fullpath);
        $title =  $request->input('title');

        Image::create([
            'title' => $title,
            'filename' => $filename
        ]); 

        return [
            'title' => $title,
            'path' => asset("storage/img/${filename}")
        ];
    }
}
