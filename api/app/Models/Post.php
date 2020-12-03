<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\FavoritablePost;
use App\Models\Traits\HasThumbnail;
use App\Models\Traits\HasComments;
use App\Models\Traits\HasUpdates;
use App\Models\Traits\HasViews;
use App\Models\Traits\HasTags;
use Laravel\Scout\Searchable;

abstract class Post extends Model
{
    use HasTags, 
        HasViews,
        HasUpdates,
        Searchable,
        HasComments,
        HasThumbnail,
        FavoritablePost;

    function toSearchableArray() {
        return [
            'title' => $this->title
        ];
    }
}