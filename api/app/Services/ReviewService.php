<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Http\Resources\ReviewResource;
use App\Models\Review;

class ReviewService
{
    public function all()
    {
        return ReviewResource::collection(
            Review::all()
        );
    }

    public function verified()
    {
        return ReviewResource::collection(
            Review::where('verified', true)->get()
        );
    }

    public function pending()
    {
        return ReviewResource::collection(
            Review::where('verified', false)->get()
        );
    }

    public function create(Request $request)
    { 
        $user = auth()->user();

        $review  =  $user->review()->create([
            'title' => $request->title,
            'text' => $request->text,
            'grade' => $request->grade,
            'user_id' => $user->id,
        ]);

        return new ReviewResource($review);
    }

    public function update()
    {

    }

    public function delete(Review $model)
    {
        $model->delete();
    }
}