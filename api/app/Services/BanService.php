<?php

namespace App\Services;

use Illuminate\Validation\ValidationException;
use App\Http\Requests\User\UnbanUser;
use App\Http\Requests\User\BanUser;
use App\Http\Resources\BanResource;
use App\Models\Comment;
use App\Models\User;
use App\Models\Ban;


class BanService 
{
    public function all()
    {
        $all = Ban::all();

        return BanResource::collection($all);
    }

    public function ban(BanUser $request)
    {
        // Retrieving user
        $userId = $request->input('user');
        $user = User::findOrFail($userId);
        
        // Predicting redundant requests
        if ($user->admin)
        {
            throw ValidationException::withMessages([
                'user_id' => "Admin cant be banned"
            ]);
        }

        if ($user->banned)
        {
            throw ValidationException::withMessages([
                'user_id' => "User is already banned"
            ]);
        }
        
        // Retrieving comment
        $commentId = $request->input('comment');
        $comment = Comment::findOrFail($commentId);
        
        // Creating new Ban
        $ban = $user->ban()->create([
            'comment_id' => $commentId
        ]);

        return new BanResource($ban);
    }

    public function unban(Ban $ban) 
    {
        $ban->delete();
        
        return;
    }
}