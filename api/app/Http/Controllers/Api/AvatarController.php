<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Services\AvatarService;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\UpdateAvatar;

class AvatarController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(AvatarService $service)
    {
        return $service->get();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateAvatar $request, AvatarService $service)
    {
        return $service->update($request);
    }
}
