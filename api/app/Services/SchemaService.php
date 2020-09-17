<?php

namespace App\Services;

use App\Models\Schema;
use App\Http\Requests\UploadSchema;
use App\Http\Requests\UpdateSchema;

class SchemaService
{
    public function create(UploadSchema $request) : Schema
    {
        $fullpath = $request->file('image')
                            ->store('public/schemas');
                            
        $title =  $request->input('title'); 
        $filename = basename($fullpath);

        return  Schema::create([
            'title' => $title,
            'filename' => $filename
        ]); 
    }

    public function get(int $index, int $limit = 0)
    {

    }

    public function all() : array
    {
        return Schema::all();
    }

    public function update(UpdateSchema $request, int $schemaIndex) : Schema
    {
        $schema = Schema::findOrFail($schemaIndex);

        if ($request->has('title'))
        {
            $schema->title =  $request->input('title');
            $schema->save();
        }

        if ($request->has('image'))
        {
            Storage::delete('public/schemas/' . $schema->filename);

            $fullpath = $request->file('image')
                                ->store('public/schemas');
            
            $schema->path = basename($fullpath);
            $schema->save();
        }
    }

    public function delete(int $schemaIndex) : void
    {
        $schema = Schema::findOrFail($schemaIndex);

        Storage::delete('public/schemas/' . $schema->filename);
        
        $schema->delete();
    }
}
