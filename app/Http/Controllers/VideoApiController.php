<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\VideoService;
use App\Http\Requests\UploadVideo;

class VideoApiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(VideoService $videoService)
    {
        return $videoService->all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(UploadVideo $request, VideoService $videoService)
    {
        $video = $videoService->create($request);

        return $video;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(int $id ,VideoService $videoService)
    {
        return $videoService->get($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(int $id, VideoService $videoService)
    {
        // NOT IN USAGE FOR NOWe
        return $videoService->update($id, []);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(int $id, VideoService $videoService)
    {
        // NOT IN USAGE FOR NOW

        return $videoService->destroy($id, []);
    }
}
