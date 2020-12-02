<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Tag\CreateTag;
use App\Http\Requests\Tag\UpdateTag;
use App\Services\TagService;
use App\Models\Tag;

class TagController extends Controller
{

    private $servive;

    public function __construct() 
    {
        $this->service = new TagService();
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(TagService $tagService)
    {
        return $tagService->all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateTag $request, TagService $tagService)
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
    public function update(int $id, TagService $tagService)
    {
        return $tagService->update($id,  $request);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Tag $tag)
    {
        return $this->service->delete($tag);
    }
}
