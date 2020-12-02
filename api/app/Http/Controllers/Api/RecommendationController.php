<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\RecommendationService;
use App\Http\Requests\Recommendation\CreateRecommendation;
use App\Http\Requests\Recommendation\UpdateRecommendation;
use App\Http\Requests\Recommendation\DeleteRecommendation;
use App\Models\Recommendation;


class RecommendationController extends Controller
{
    private $service = null;

    public function __construct()
    {
/*         $this->middleware('auth:sanctum')
            ->only('store', 'update', 'destroy'); */

        $this->service = new RecommendationService();
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
    public function store(CreateRecommendation $request)
    {
        return $this->service->create($request);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Recommendation  $recommendation
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateRecommendation $request, Recommendation $recommendation)
    {
        return $this->service->update($request, $recommendation);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Recommendation  $recommendation
     * @return \Illuminate\Http\Response
     */
    public function destroy(DeleteRecommendation $request, Recommendation $recommendation)
    {
        return $this->service->delete($recommendation);
    }
}
