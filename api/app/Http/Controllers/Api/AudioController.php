<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Audio\CreateAudio;
use App\Http\Requests\Audio\UpdateAudio;
use App\Http\Requests\Audio\DeleteAudio;
use App\Services\Posts\AudioService;
use App\Models\Audio;


class AudioController extends Controller
{
    private $service;

    public function __construct() 
    {
        $this->service = new AudioService();
        
        $this->middleware('auth:sanctum')
        ->only(['store', 'update', 'destroy']);
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
    public function store(CreateAudio $request)
    {
        return $this->service->create($request); 
    }

    /**
     * Return the specified audio post.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Audio $audio)
    {
        return $this->service->get($audio); 
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateAudio $request, Audio $audio)
    {
        return $this->service->update($request, $audio); 
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(DeleteAudio $request, Audio $audio)
    {
        return $this->service->destroy($audio); 
    }
}
