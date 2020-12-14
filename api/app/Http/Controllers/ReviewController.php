<?php

namespace App\Http\Controllers;

use App\Services\ReviewService;
use App\Http\Requests\Review\CreateReview;
use App\Http\Requests\Review\VerifyReview;
use App\Models\Review;

class ReviewController extends Controller
{
    private $service;

    public function __construct()
    {
        $this->middleware('auth:sanctum')
            ->except(['verified']);

        $this->service = new ReviewService();
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

    public function pending()
    {
        return $this->service->pending();
    }

    public function verified()
    {
        return $this->service->verified();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateReview $request)
    {
        return $this->service->create($request);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(VerifyReview $request, Review $review)
    {
        return $this->service->verify($review); 
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function destroy(Review $review)
    {
        return $this->service->delete($review);
    }
}
