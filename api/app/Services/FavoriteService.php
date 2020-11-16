<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Http\Resources\FavoriteResource; 
use App\Models\Favoritable;
use App\Models\Video;
use stdClass;

class FavoriteService
{
    private $commentable = [
        'videos' => Video::class,
        'audio' => Audio::class,
    ];

    private function computeClass(string $postType)
    {
        foreach ($this->commentable as $link => $class)
        {   
            if ($link === $postType)
                return $class;
        }

       abort(404);
    }


    public function all()
    {
        $queryResult = DB::table('favoritables')
            ->where('user_id', auth()->user()->id)
            ->get();
        
        // Grouping post id's by classes   
        $favorites = [];
        foreach ($queryResult as $raw)
        {
            $favorite = new stdClass();
            $favorite->id = $raw->id;
            $favorite->post = 
                $raw->favoritable_type::findOrFail($raw->favoritable_id);
            
            $favorites[] = $favorite;
        }

        return FavoriteResource::collection($favorites);
    }

    public function create(string $postType, Request $request)
    { 
        $userId = auth()->user()->id;
        $postId =  $request->input('postId');
        $class = $this->computeClass($postType);
        $data = [
            'user_id' => $userId, 
            'favoritable_id' => $postId,
            'favoritable_type'=> $class
        ];

        // Preventing readundant requests
        $favorite = Favoritable::where($data)->first();
        if ($favorite)
            abort(422);
        
        $favorite = Favoritable::create($data);
        return new FavoriteResource($favorite);
    }

    public function delete(Favoritable $favorite)
    {
        $favorite->delete();   
    }
}