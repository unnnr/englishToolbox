<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\Posts\VideoService;
use App\Http\Requests\Video\CreateVideo;
use App\Http\Requests\Video\UpdateVideo;
use App\Http\Requests\Video\DeleteVideo;
use App\Models\Video;


class VideoController extends Controller
{
    private $service;

    public function __construct() 
    {
        $this->service = new VideoService();

        $this->middleware('auth:sanctum')
            ->only(['store', 'update', 'destroy']);
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
    public function store(CreateVideo $request)
    {
        return $this->service->create($request);;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Video $video)
    {
        return $this->service->get($video);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Video $video, UpdateVideo $request)
    {
        return $this->service->update($request, $video);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Video $video, DeleteVideo $request)
    {
        return $this->service->destroy($video);
    }
}
