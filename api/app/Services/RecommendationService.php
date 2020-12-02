<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Http\Resources\RecommendationResource;
use App\Models\Recommendation;

class RecommendationService
{
    public function all()
    {
        $all = Recommendation::all();

        return RecommendationResource::collection($all);
    }


    public function create(Request $request)
    { 
        $path = $request
            ->file('image')
            ->store(Recommendation::STORAGE_PATH);
        $image = basename($path);
            
        $title = $request->input('title');
        $link = $request->input('link');
        $description = $request->input('description');

        $recommendation = Recommendation::create([
            'description' => $description,
            'image' => $image,
            'title' => $title,
            'link' => $link,
        ]);

        return new RecommendationResource($recommendation);
    }

    public function update(Recommendation $model)
    {
       
    }

    public function delete(Recommendation $model)
    {
        
    }
}