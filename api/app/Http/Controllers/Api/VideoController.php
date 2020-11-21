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
    public function store(CreateVideo $request, VideoService $videoService)
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
    public function show(Video $video ,VideoService $videoService)
    {
        return $videoService->get($video);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Video $video, UpdateVideo $request, VideoService $videoService)
    {
        return $videoService->update($request, $video);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Video $video, DeleteVideo $request, VideoService $videoService)
    {
        return $videoService->destroy($video);
    }
}
