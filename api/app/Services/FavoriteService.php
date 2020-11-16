<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Http\Resources\PostResource; 

class FavoriteService
{
    public function all()
    {
        $favorites = auth()->user()->favorites;

        return PostResource::collection($favorites);
    }

    public function create(string $postType, Request $request)
    { 
    }

    public function delete(Review $model)
    {
    }
}