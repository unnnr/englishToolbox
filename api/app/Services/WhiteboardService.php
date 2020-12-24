<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Http\Requests\User\MakeAction;
use App\Models\WhiteboardDrawing as Drawing;


class WhiteboardService 
{
    public function all()
    {
        return ReviewResource::collection(
            Review::all()
        );
    }

    public function create(Request $request)
    { 
        $user = auth()->user();
        
        $avatar = $this->copyAvatar($user->avatar);
        
        $review  =  $user->reviews()->create([
            'title' => $request->title,
            'text' => $request->text,
            'grade' => $request->grade,
            'user_name' => $user->name,
            'user_avatar' => $avatar,
        ]);

        return new ReviewResource($review);
    }

    public function verify(Review $review)
    {
        $review->verified = true;

        $review->save();

        return new ReviewResource($review);
    }

    public function delete(Review $model)
    {
        // Removing avatar
        $filepath = Review::AVATARS_PATH . '/' .  $model->user_avatar;
        Storage::delete($filepath);

        $model->delete();
    }
}