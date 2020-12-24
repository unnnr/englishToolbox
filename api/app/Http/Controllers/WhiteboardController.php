<?php

namespace App\Http\Controllers;

use App\Services\Posts\WhiteboardService;
use App\Http\Requests\Whiboard\ClearWhiteboard;
use App\Http\Requests\Whiboard\UpdateDrawing;
use App\Http\Requests\Whiboard\CreateDrawing;
use App\Http\Requests\Whiboard\DeleteDrawing;
use App\Models\WhiteboardDrawing as Drawing;



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
    public function update(Drawing $model, UpdateDrawing $request)
    {
        return $this->service->update($request, $model);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Drawing $model, DeleteDrawing $request)
    {
        return $this->service->destroy($model);
    }

    /**
     * Remove the specified all drawings
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function clear(ClearWhiteboard $request)
    {
        return $this->service->cler($video);
    }

}