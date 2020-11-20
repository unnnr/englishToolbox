<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;


class Avatar extends Model
{
    const STORAGE_PATH = 'public/avatars';
    
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
        return url(Storage::url(self::STORAGE_PATH.'/'.$this->name));
    }
}
