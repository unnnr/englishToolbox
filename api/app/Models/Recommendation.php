<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Recommendation extends Model
{
    const STORAGE_PATH = 'public/recommendations';

    protected $fillable = [
        'link', 'title', 'image', 'description'
    ];

    public function getImageUrlAttribute() {
        return url(Storage::url(self::STORAGE_PATH.'/'.$this->image));
    }
}
