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
        if (auth()->user()->id === $userId) 
        {
            throw ValidationException::withMessages([
                'user_id' => "You cant ban yourself"
            ]);
        }
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
        
        // Creating new Ban
        $reason = $request->input('reason');
        $ban = $user->ban()->create([
            'reason' => $reason,
        ]);

        // Deleting all user comment
        $user->comments()->delete();

        return new BanResource($ban);
    }

    public function unban(Ban $ban) 
    {
        $ban->delete();
        return;
    }
}