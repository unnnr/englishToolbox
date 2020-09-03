<?php

namespace App\Services;

use Symfony\Component\HttpFoundation\Response;
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
            if (strlen($class) < strlen($postType))
                continue;
        
            // Check if class ends with $postType
            if (substr_compare($class, ucfirst($postType), -strlen($postType), true) === 0)
                return $class;
        }

        return null;
    }

    public function create(Request $request)
    {
        $postClass = $this->getPostClass($request->route('postType'));

        if (is_null($postClass))
            return response('', Response::HTTP_BAD_REQUEST);
        
        $postId = (int) $request->route('postId');

        $post = $postClass::findOrFail($postId);


        $newComment = $post->comments()->create([
            'user_id' =>    $request->input('userId'),
            'text' => $request->input('text')
        ]);

        return new CommentResource($newComment);
    }

    public function get($id)
    {
        $tag = Tag::find($tagId);

        return new CommentResource($tag);
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
