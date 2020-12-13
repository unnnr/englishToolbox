<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Http\Resources\FavoriteResource; 
use App\Models\Favoritable;
use stdClass;

class FavoriteService
{
    private $favoritable = [
        'charts' => \App\Models\Chart::class,
        'videos' =>\App\Models\Video::class,
        'audio' => \App\Models\Audio::class,
    ];

    private function computeClass(string $postType)
    {
        foreach ($this->favoritable as $link => $class)
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
            $id = $raw->id;
            $favorite = Favoritable::findOrFail($id);

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
            abort(421);
        
        $favorite = Favoritable::create($data);
        return new FavoriteResource($favorite);
    }

    public function show(string $postType) 
    {
        $class = $this->computeClass($postType);
        $user = auth()->user();

        $favorites = Favoritable::where([
            'favoritable_type' => $class,
            'user_id' => $user->id
        ])->get();

        return FavoriteResource::collection($favorites);
    }

    public function delete(Favoritable $favorite)
    {
        $favorite->delete();   
    }
}