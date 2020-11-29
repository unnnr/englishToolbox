<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class View extends Model
{
    const UPDATED_AT = null;

    public $fillable = [
        'user_id'
    ];
}