<?php

namespace App\Services;

use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Resources\CommentResource;
use App\Models\Comment;
use App\Models\Video;
use App\Models\Audio;


class CommentService
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

    public function create(Request $request, string $postType, int $postId)
    {
        $postClass = $this->getPostClass($postType);

        if (is_null($postClass))
            return response(null, Response::HTTP_BAD_REQUEST);
        
        $post = $postClass::findOrFail($postId);

        $newComment = $post->comments()->create([
            'user_id' =>  auth()->user()->id,
            'message' => $request->input('message')
        ]);

        return (new CommentResource($newComment))
                    ->response()
                    ->setStatusCode(Response::HTTP_CREATED); 
    }

    public function delete(int $id)
    {
        $comment = Comment::findOrFail($id);

        $comment->delete();
    }

    public function all()
    {
        $all = Comment::all();

        return CommentResource::collection($all);
    }

    public function allPostComments(string $postType, int $postId)
    {
        $postClass = $this->getPostClass($postType);

        if (is_null($postClass))
            return response(null, Response::HTTP_BAD_REQUEST);
    
        $post = $postClass::findOrFail($postId);
        
        $comments = $post->comments;

        return CommentResource::collection( $comments);
    }

    public function attachedToUser() 
    {
        $comments = auth()->user()->comments;

        return CommentResource::collection($comments);
    }

    public function deleteAttachedToUser()
    {
        $comments = auth()->user()->comments()->delete();
    }
}
