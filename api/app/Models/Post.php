<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\FavoritablePost;
use App\Models\Traits\HasThumbnail;
use App\Models\Traits\HasComments;
use App\Models\Traits\HasUpdates;
use App\Models\Traits\HasViews;
use App\Models\Traits\HasTags;

abstract class Post extends Model
{
    use HasTags, 
        HasViews,
        HasUpdates,
        HasComments,
        HasThumbnail,
        FavoritablePost;
}