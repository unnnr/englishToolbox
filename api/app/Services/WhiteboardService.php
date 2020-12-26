<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Http\Resources\WhiteboardDrawingResource as DrawingResource;
use App\Models\WhiteboardDrawing as Drawing;
use App\Events\WhiteboardCleared;
use App\Events\WhiteboardUnlocked;
use App\Events\WhiteboardLocked;
use App\Events\DrawingRemoved;
use App\Events\DrawingCreated;
use App\Models\Status;


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
        broadcast(new DrawingRemoved($drawing))->toOthers();
        
        $drawing->delete();
    }
    

    public function clear()
    {
        Drawing::truncate();

        broadcast(new WhiteboardCleared())->toOthers();
    }

    public function lock() {
        Status::of('whietboard')->set('locked');

        broadcast(new WhiteboardLocked())->toOthers();
    }

    public function unlock() {
        Status::of('whietboard')->set('unlocked');

        broadcast(new WhiteboardUnlocked())->toOthers();
    }
}