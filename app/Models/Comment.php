<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    public $fillable = [
        'message', 'user_id'
    ];

    public function commentable()
    {
        return $this->morphTo();
    }
}
