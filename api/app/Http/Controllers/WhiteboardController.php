<?php

namespace App\Http\Controllers;

use App\Services\WhiteboardService;
use App\Http\Requests\Whiteboard\ClearWhiteboard;
use App\Http\Requests\Whiteboard\UpdateDrawing;
use App\Http\Requests\Whiteboard\CreateDrawing;
use App\Http\Requests\Whiteboard\DeleteDrawing;
use App\Models\WhiteboardDrawing;


class WhiteboardController extends Controller
{
    private $service;

    public function __construct() 
    {
        $this->service = new WhiteboardService();

        $this->middleware('auth:sanctum')
            ->only(['store', 'update', 'destroy', 'clear']);
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->service->all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateDrawing $request)
    {
        return $this->service->create($request);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(WhiteboardDrawing $drawing, UpdateDrawing $request)
    {
        return $this->service->update($request, $model);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(WhiteboardDrawing $drawing, DeleteDrawing $request)
    {
        return $this->service->delete($drawing);
    }

    /**
     * Remove the specified all drawings
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function clear(ClearWhiteboard $request)
    {
        return $this->service->clear();
    }

    /**
     * Allowes not admins to edit whiteboard
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function lock(ToggleWhiteboard $request)
    {
        return $this->service->unlock();
    }

    /**
     * Allowes not admins to edit whiteboard
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function unlock(ToggleWhiteboard $request)
    {
        return $this->service->unlock();
    }
}