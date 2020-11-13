<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\UnbanUser;
use App\Http\Requests\User\BanUser;
use App\Services\BanService;
use App\Models\User;


class BanController extends Controller
{
    private $service = null;

    public function __construct()
    {
        // $this->middleware('auth:sanctum');

        $this->service = app(BanService::class);
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
    public function store(User $id, BanUser $request)
    {
        return $this->service->ban($user, $request);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $id, UnbanUser $request)
    {
        return $this->service->unban($user);
    }
}