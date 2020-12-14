<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\UpdateAvatar;
use App\Services\AvatarService;

class AvatarController extends Controller
{
    public function __construct()
    {
        $this->service = new AvatarService();

        $this->middleware('auth:sanctum');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->service->get();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateAvatar $request)
    {
        return $this->service->update($request);
    }
}
