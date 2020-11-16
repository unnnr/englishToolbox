<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
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
        $queryResult = DB::table('favoritables')
            ->where('user_id', auth()->user()->id)
            ->get();
        
        // Grouping post id's by classes   
        foreach ($queryResult as $raw)
        {
            $class = $raw->favoritable_type;
            
            $favorites[] = [
                'id' => $raw->id,
                'post' => $class::findOrFail($raw->favoritable_id)
            ];
        }

        return ['data' => collect($favorites)];
    }

    public function create(string $postType, Request $request)
    { 
        $post = $this->getPost($postType, $request->input('postId'));
        
        $post->favoritedBy()->syncWithoutDetaching(auth()->user());

        return new PostResource($post);
    }

    public function delete(int $id)
    {
        $post = $this->getPost($postType, $postId);

        $post->favoritedBy()->detach(auth()->user());
    }
}