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

    private function getPostClass($postType)
    {
        foreach ($this->commentable as $class)
        {   
            if (Str::endsWith($class, ucfirst($postType)))
                return $class;
        }

        return null;
    }

    public function create(Request $request, $postType, $postId)
    {
        return auth();

        $postClass = $this->getPostClass($postType);

        if (is_null($postClass))
            return response('', Response::HTTP_BAD_REQUEST);
        
        $post = $postClass::findOrFail($postId);

        $newComment = $post->comments()->create([
            'user_id' =>  auth('web')->user()->id,
            'text' => $request->input('text')
        ]);

        return new CommentResource($newComment);
    }

    public function get($id)
    {
        $comment = Comment::find($id);

        return new CommentResource($comment);
    }

    public function all()
    {
        $all = Tag::all();

        return CommentResource::collection($all);
    }

    public function update()
    {
       
    }

    public function delete()
    {

    }
}
