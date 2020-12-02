<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Http\Resources\RecommendationResource;
use App\Models\Recommendation;

class RecommendationService
{
    private function storeImage(object $file)
    {
        $path = $file->store(Recommendation::STORAGE_PATH);

        // Returning file name
        return basename($path);
    }

    private function deleteImage(Recommendation $model) 
    {
        $path = Recommendation::STORAGE_PATH . '/' . $model->image;
        Storage::delete($path);
    }

    public function all()
    {
        $all = Recommendation::all();

        return RecommendationResource::collection($all);
    }


    public function create(Request $request)
    { 
        // Stroring image
        $image = $request->file('image');
        $fileName = $this->storeImage($image);
        
        // Retrieving default data
        $description = $request->input('description');
        $title = $request->input('title');
        $link = $request->input('link');
        
        // Creating instance
        $recommendation = Recommendation::create([
            'description' => $description,
            'image' => $fileName,
            'title' => $title,
            'link' => $link,
        ]);

        return new RecommendationResource($recommendation);
    }

    public function update(Request $request, Recommendation $model)
    {
        if ($request->hasFile('image')) 
        {
            // Deleting previous image
            $this->deleteImage($model);
            
            // Stroring new
            $image = $request->file('image');
            $model->image = $this->storeImage($image);
        }

        if ($request->has('description'))
            $model->description = $request->input('description');

        if ($request->has('title'))
            $model->title = $request->input('title');

        if ($request->has('link'))
            $model->link = $request->input('link');

        $model->save();

        return new RecommendationResource($model);
    }

    public function delete(Recommendation $model)
    {
        $this->deleteImage($model);
        
        $model->delete();
    }
}