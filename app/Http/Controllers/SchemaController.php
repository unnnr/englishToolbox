<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Schema;
use App\Services\SchemaService;
use App\Http\Requests\UploadSchema;

class SchemaController extends Controller
{
    public function index(SchemaService $schemaService)
    {
        return view('content.images', ['posts' => Schema::limit(10)->get()]);
    }

    public function store(UploadSchema $request, SchemaService $schemaService)
    {
        $schema = $schemaService->create($request);

        return [
            'title' => $schema->title,
            'path' => asset('storage/img/' . $schema->filename)
        ];
    }
}
