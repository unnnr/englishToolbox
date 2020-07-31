<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UploadImage;
use App\Models\Image;

class ImageController extends Controller
{
    public function index()
    {
        return view('content.images');
    }

    public function store(UploadImage $request)
    {
        $path = $request->file('image')->store('public/img');
        $title =  $request->input('title');

        Image::create([
            'title' => $title,
            'path' => $path
        ]); 
    }
}
