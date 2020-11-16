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

    private function getPost(string $postType, int $postId) 
    {
        $postClass = $this->getPostClass($postType);
        if (!!!$postClass)
            abort(404);
        
        return $postClass::findOrFail($postId);
    }

    public function all()
    {
        $favorites = auth()->user()->favorites;

        return PostResource::collection($favorites);
    }

    public function create(string $postType, Request $request)
    { 
        $post = $this->getPost($postType, $request->input('postId'));
        
        $post->favoritedBy()->syncWithoutDetaching(auth()->user());

        return new PostResource($post);
    }

    public function delete(string $postType, int $postId)
    {
        $post = $this->getPost($postType, $postId);

        $post->favoritedBy()->detach(auth()->user());
    }
}