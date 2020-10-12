<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\ReviewService;
use App\Http\Requests\Review\CreateReview;

class ReviewController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['verified']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(ReviewService $service, Request $request)
    {
        return $service->all();
    }

    public function pending(ReviewService $service, Request $request)
    {
        return $service->pending();
    }

    public function verified(ReviewService $service)
    {
        return $service->verified();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ReviewService $service, CreateReview $request)
    {
        return $service->create($request);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function destroy(ReviewService $service, Review $review)
    {
        //
    }
}
