<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    public const AVATARS_PATH = 'public/reviewsAvatars';

    protected $fillable = [
        'title', 'text', 'grade', 'verified', 'user_name', 'user_avatar'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getAvatarUrlAttribute() 
    {
        return self::AVATARS_PATH . '/' . $this->user_avatar;
    } 
}
