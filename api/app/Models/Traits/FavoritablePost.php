<?php

namespace App\Models\Traits;

use App\Models\User;

trait FavoritablePost
{
    public function favoritedBy()
    {
        return $this->morphToMany(User::class, 'favoritable');
    }   
}   