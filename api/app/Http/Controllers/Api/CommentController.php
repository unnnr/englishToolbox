<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Services\CommentService;
use App\Http\Controllers\Controller;
use App\Http\Requests\Comment\CreateComment;
use App\Http\Requests\Comment\UpdateComment;
use App\Http\Requests\Comment\DeleteComment;

class CommentController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['show', 'index']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(CommentService $service, string $postType, int $postId)
    {
        return $service->allPostComments($postType, $postId);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateComment $request, CommentService $service, $postType, $postId)
    {
        return $service->create($request, $postType, (int) $postId);
    }
    
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(CommentService $service, $id)
    {
        return $service->delete($id);
    }


    public function attachedToUser(CommentService $service) 
    {
        return $service->attachedToUser();
    }

    public function deleteAttachedToUser(CommentService $service)
    {
        return $service->deleteAttachedToUser();
    }
}
