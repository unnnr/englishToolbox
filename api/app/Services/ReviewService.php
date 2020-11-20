<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Http\Resources\ReviewResource;
use App\Services\AvatarService;
use App\Models\Review;
use App\Models\Avatar;


class ReviewService
{
    private function copyAvatar(Avatar $avatar) : string
    {
        $filename =  $avatar->name;

        $from = Avatar::STORAGE_PATH . '/' . $filename;
        $to = Review::AVATARS_PATH . '/' . $filename;

        if (!!!file_exists(Storage::path($to)))
            Storage::copy($from, $to);

        return $filename; 
    }
    
    public function all()
    {
        return ReviewResource::collection(
            Review::all()
        );
    }

    public function verified()
    {
        return ReviewResource::collection(
            Review::where('verified', true)->get()
        );
    }

    public function pending()
    {
        return ReviewResource::collection(
            Review::where('verified', false)->get()
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