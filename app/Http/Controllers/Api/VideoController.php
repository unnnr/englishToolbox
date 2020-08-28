<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\Posts\VideoService;
use App\Http\Requests\UploadVideo;
use App\Http\Requests\UpdateVideo;
use App\Http\Requests\DeleteVideo;


class VideoController extends Controller
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
    public function update(int $id, UpdateVideo $request, VideoService $videoService)
    {
        return $videoService->update($request, $id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(int $id, DeleteVideo $request, VideoService $videoService)
    {
        return $videoService->destroy($id);
    }
}
