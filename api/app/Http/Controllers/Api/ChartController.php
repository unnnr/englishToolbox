<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Chart\CreateChart;
use App\Http\Requests\Chart\UpdateChart;
use App\Http\Requests\Chart\DeleteChart;
use App\Services\Posts\ChartService;
use App\Models\Chart;


class ChartController extends Controller
{
    private $service;

    public function __construct() 
    {
        $this->service = new ChartService();
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
    public function store(CreateChart $request)
    {
        return $this->service->create($request); 
    }

    /**
     * Return the specified chart post.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Chart $chart)
    {
        return $this->service->get($chart); 
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateChart $request, Chart $chart)
    {
        return $this->service->update($request, $chart); 
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(DeleteChart $request, Chart $chart)
    {
        return $this->service->destroy($chart); 
    }
}
