<?php

namespace App\Services;

use App\Models\Schema;
use App\Http\Requests\UploadSchema;

class SchemaService
{
    public function create(UploadSchema $request)
    {
        $fullpath = $request->file('image')->store('public/img');
        $filename = basename($fullpath);
        $title =  $request->input('title');

        return  Schema::create([
            'title' => $title,
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
