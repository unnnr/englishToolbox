<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Favoritable extends Model
{
    public $timestamps = FALSE;

    protected $fillable = [
        'favoritable_type', 'favoritable_id', 'user_id' 
    ];

    public function getPostAttribute() 
    {
        return $this->favoritable_type::findOrFail(
            $this->favoritable_id);
    }

    public function getUserAttribute() 
    {
        return User::findOrFail($this->user_id);
    }
}
