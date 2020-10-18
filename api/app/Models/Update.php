<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Update extends Model
{
    protected $fillable = [
        'title', 'description', 'thumbnail_url'
    ];

    public function updatable() 
    {
        return $this->morphTo();
    }
}
