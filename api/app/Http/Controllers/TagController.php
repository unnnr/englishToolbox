<?php

namespace App\Http\Controllers;


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

        $this->middleware('auth:sanctum')
            ->only(['store', 'destroy']);
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
    public function store(CreateTag $request)
    {
        return $this->service->create($request);
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
