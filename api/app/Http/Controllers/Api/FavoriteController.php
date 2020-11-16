<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Favorite\CreateFavorite;
use App\Http\Controllers\Controller;
use App\Services\FavoriteService;

class FavoriteController extends Controller
{
    private $service = null;

    public function __construct()
    {
        $this->middleware('auth:sanctum');

        $this->service = app(FavoriteService::class);
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
    public function store(string $postType, CreateFavorite $request)
    {
        return $this->service->create($postType, $request);
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
}
