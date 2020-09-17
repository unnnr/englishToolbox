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
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(CommentService $service, $id)
    {
        return $service->get($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateComment $request, CommentService $service, $id)
    {
        return $service->update($request, (int) $id);
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
}
