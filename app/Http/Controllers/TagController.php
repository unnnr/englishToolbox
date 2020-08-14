<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateTags;
use App\Http\Requests;
use App\Models\Tag;
use App\Models\Video;
use App\Services\TagService;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(int $id, TagService $tagService)
    {
        return $tagService->videoTags($id);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateTags $request, TagService $tagService)
    {
        return $tagService->create($request);
    }

    /**
     * Return the specified tag.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(int $id, TagService $tagService)
    {
 
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    /**
     * Return all tags
     *
     * @return \Illuminate\Http\Response
     */
    public function all(TagService $tagService)
    {
        return $tagService->all();
    }
}
