<?php

namespace App\Services;

use App\Http\Requests\User\UnbanUser;
use App\Http\Requests\User\BanUser;
use App\Services\UserService;
use App\Models\Comment;
use App\Models\Ban;

class BanService 
{
    public function all()
    {
        return Banned::all();
    }

    public function ban(User $user, BanUser $request) : void
    {
        // Predicting redundant requests
        if ($user->banned())
        {
            throw ValidationException::withMessages([
                'user_id' => "User is already banned"
            ]);
        }
        
        // Retrieving comment
        $commentId = $request->input('comment_id');
        $comment = Comment::findOrFail($commentId);
        
        // Creating new Ban
        $ban = $user->ban()->create(['comment_id', $commentId]);

        return;
    }

    public function unban(User $user) : void
    {
        // Predicting redundant requests
        if (!!!$user->banned())
        {
            throw ValidationException::withMessages([
                'user_id' => "User isnt banned"
            ]);
        }
        
        $user->ban()->delete();

        return;
    }
}