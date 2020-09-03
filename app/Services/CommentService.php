<?php

namespace App\Services;

use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Resources\CommentResource;
use App\Models\Video;
use App\Models\Audio;
use App\Models\Comment;


class CommentService
{

    private $commentable = [
        Audio::class,
        Video::class
    ];

    private function getPostClass(string $postType)
    {
        foreach ($this->commentable as $class)
        {   
            if (Str::endsWith($class, ucfirst($postType)))
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
            'text' => $request->input('text')
        ]);

        return (new CommentResource($newComment))
                    ->response()
                    ->setStatusCode(Response::HTTP_CREATED); 
    }

    public function update(Request $request, int $id)
    {
        $comment = Comment::findOrFail($id);

        $comment->update($request->validated());

        return new CommentResource($comment);
    }

    public function delete(int $id)
    {
        $comment = Comment::findOrFail($id);

        $comment->delete();

        response('', Response::HTTP_NO_CONTENT);
    }

    public function get(int $id)
    {
        $comment = Comment::findOrFail($id);

        return new CommentResource($comment);
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
}
