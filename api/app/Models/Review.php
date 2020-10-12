<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = [
        'title', 'text', 'grade', 'verified'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
