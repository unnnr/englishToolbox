<?php

namespace App\Services\Posts;

use Intervention\Image\ImageManagerStatic as Image;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Services\Traits\HandlePostThumbnails;
use App\Services\Posts\PostService;
use App\Http\Resources\ChartResource;
use App\Models\Chart;


use Illuminate\Support\Facades\Log;

class ChartService extends PostService
{
    use HandlePostThumbnails;
    
    protected $model = Chart::class;
    
    protected $resource = ChartResource::class;

    protected function getThumbnailUrl(Chart $chart, Request $request) 
    {
        return $this->storeThumbnail(
            $request->file('imageFile'),
            $chart->image,
            $chart);
    }

    protected function creating(Request $request)
    { 
        // Creating files
        $imageFileName = 
            $this->storeFile($request->file('image'), Chart::IMAGE_PATH);
        
        // Retrieving sended data 
        $description = $request->input('description');
        
        $title =  $request->input('title'); 
        
        return Audio::create([
            'title' => $title,
            'description' => $description,
            'image' => $imageFileName,
        ]);
    }

    protected function updating(Request $request, Audio $chart)
    {   
        if ($request->has('image'))
        {
            // Removing previous image file and thumbnail
            Storage::delete(Chart::IMAGE_PATH .'/'. $chart->imageFile);
            Storage::delete(Chart::THUMBNAIL_PATH .'/'. $chart->imageFile);

            // Storing new image and updating model
            $chart->image = 
                $this->storeFile($request->file('image'), Chart::IMAGE_PATH);

            // Creating new thumbnail and updating model
            $chart->thumbnail()->update([
                'url' => $this->getThumbnailUrl($chart, $request)
            ]);
        }

        if ($request->has('title'))
            $chart->title = $request->input('title'); 

        if ($request->has('description'))
            $chart->description = $request->input('description'); 

        $chart->save();
    }

    protected function deleting(Chart $post)
    {
        $imageName = $post->image;

        Storage::delete(Chart::THUMBNAIL_PATH .'/'. $imageName);
        Storage::delete(Chart::IMAGE_PATH .'/'. $imageName);
    }
}