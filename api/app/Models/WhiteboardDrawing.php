<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WhiteboardDrawing extends Model
{
    public $timestamps = FALSE;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'body'
    ];

}