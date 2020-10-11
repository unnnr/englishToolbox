<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Avatar extends Model
{
    public $fillable = [
        'name'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($query) {
            $query->name = $query->name ?? 'default_1.webp';
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getUrlAttribute()
    {
        return asset('storage/avatars/' . $this->name);
    }
}