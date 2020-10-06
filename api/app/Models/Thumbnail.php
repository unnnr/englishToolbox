<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Thumbnail extends Model
{
    const UPDATED_AT = null;

    public $fillable = [
        'url'
    ];

    public function thumbnailable() 
    {
        return $this->morphTo();
    }
}
