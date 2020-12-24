<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Models\WhiteboardDrawing as Drawing;
use App\Http\Resources\WhiteboardDrawingResource as DrawingResource;


class WhiteboardService 
{
    public function all()
    {
        $drawings =  Drawing::all();

        return DrawingResource::collection($drawings);
    }

    public function create(Request $request)
    { 
        $drawing = Drawing::create([
           'body' => $request->input($body)
        ]);

       return new DrawingResource($drawing);
    }

    public function update(Drawing $drawing, Request $request)
    {
        $drawings->body = $request->input('body');

        return new ReviewResource($review);
    }

    public function delete(Drawing $drawing)
    {
        $drawing->delete();
    }

    public function clear()
    {
        Drawing::truncate();
    }
}