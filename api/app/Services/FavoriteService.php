<?php

namespace App\Services;

use App\Http\Resources\PostResource; 

class FavoriteService
{
    public function all()
    {
        $favorites = auth()->user()->favorites;

        return PostResource::collection($favorites);
    }

    public function create(Request $request)
    { 
     
    }

    public function verify(Review $review)
    {
       
    }

    public function delete(Review $model)
    {
        $model->delete();
    }
}