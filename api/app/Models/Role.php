<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    public $timestamps = false;

    public $fillable = [
        'name'
    ];

    public function user() {
        $this->belongsTo(User::class);
    }
}
