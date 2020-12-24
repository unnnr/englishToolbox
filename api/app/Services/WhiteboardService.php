<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Http\Resources\WhiteboardDrawingResource as DrawingResource;
use App\Models\WhiteboardDrawing as Drawing;
use App\Events\WhiteboardCleared;
use App\Events\DrawingRemoved;
use App\Events\DrawingCreated;


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
           'body' => $request->input('body')
        ]);

        broadcast(new DrawingCreated($drawing))->toOthers();

       return new DrawingResource($drawing);
    }

    public function update(Drawing $drawing, Request $request)
    {
        $drawings->body = $request->input('body');

        return new ReviewResource($review);
    }

    public function delete(Drawing $drawing)
    {
        logger($drawing);

        broadcast(new DrawingRemoved($drawing))->toOthers();
        
        $drawing->delete();
    }

    public function clear()
    {
        Drawing::truncate();

        broadcast(new WhiteboardCleared($drawing))->toOthers();
    }
}