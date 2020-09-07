<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Update extends Model
{
    protected $fillable = [
        'thumbnail_url'
    ];

    public function updatetable() 
    {
        return $this->moprhTo();
    }
}
