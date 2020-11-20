<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Favorite\CreateFavorite;
use App\Http\Controllers\Controller;
use App\Services\FavoriteService;
use App\Models\Favoritable;

class FavoriteController extends Controller
{
    private $service = null;

    public function __construct()
    {
        $this->middleware('auth:sanctum');

        $this->service = new FavoriteService();
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
     * Return the specified tag.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(string $postType)
    {
        return $this->service->show($postType);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Favoritable $favorite)
    {
        return $this->service->delete($favorite);
    }
}
