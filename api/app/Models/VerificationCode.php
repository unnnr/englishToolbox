<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VerificationCode extends Model
{
    protected $fillable = [
        'key', 'type', 'attempts'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
