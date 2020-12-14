<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\CommentService;

use App\Http\Requests\Comment\CreateComment;
use App\Http\Requests\Comment\UpdateComment;
use App\Http\Requests\Comment\DeleteComment;

class CommentController extends Controller
{

    private $service = null;

    public function __construct()
    {
        $this->service = new CommentService();

        $this->middleware('auth:sanctum')
            ->except(['show', 'index']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(string $postType, int $postId)
    {
        return $this->service->allPostComments($postType, $postId);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateComment $request, $postType, $postId)
    {
        return $this->service->create($request, $postType, (int) $postId);
    }
    
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return $this->service->delete($id);
    }


    public function attachedToUser() 
    {
        return $this->service->attachedToUser();
    }

    public function deleteAttachedToUser()
    {
        return $this->service->deleteAttachedToUser();
    }
}
