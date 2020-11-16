<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Http\Resources\PostResource; 
use App\Models\Video;

class FavoriteService
{
    private $commentable = [
        'audio' => Audio::class,
        'videos' => Video::class
    ];

    private function getPostClass(string $postType)
    {
        foreach ($this->commentable as $link => $class)
        {   
            if ($link === $postType)
                return $class;
        }

        return null;
    }

    public function all()
    {
        $favorites = auth()->user()->favorites;

        return PostResource::collection($favorites);
    }

    public function create(string $postType, Request $request)
    { 
        $postClass = $this->getPostClass($postType);
        if (!!!$postClass)
            abort(404);
        
        $postId = $request->input('postId');
        $post = $postClass::findOrFail($postId);
        
        $user = auth()->user();
        $post->favoritedBy()->attach($user);

        return new PostResource($post);
    }

    public function delete(Review $model)
    {
    }
}