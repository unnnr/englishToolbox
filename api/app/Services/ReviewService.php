<?php

namespace App\Services;

use App\Models\Review;

class ReviewService
{
    public function all()
    {
        return Review::all();
    }

    public function verified()
    {
        return Review::where('verified', true)->get();
    }

    public function pending()
    {
        return Review::where('verified', false)->get();
    }

    public function create()
    { 

    }

    public function delete()
    {

    }
}