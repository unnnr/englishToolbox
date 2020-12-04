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

use Illuminate\Support\Facades\Log;

abstract class Post extends Model
{
    use HasTags, 
        HasViews,
        HasUpdates,
        Searchable,
        HasComments,
        HasThumbnail,
        FavoritablePost;

    public function searchableAs()
    {
        return 'posts';
    }

    function toSearchableArray() {

        return [
            'thumbnail' => $this->thumbnail->url,

            'title' => $this->title,

            'type' => $this->type,

            'mainTag' => new \App\Http\Resources\TagResource($this->mainTag),
            
            'tags' => \App\Http\Resources\TagResource::collection($this->tags),
        ];
    }

    public function getTypeAttribute() 
    {
        $type = $this->favoritable_type;

        $shorten = substr(strrchr($type, '\\'), 1);

        return lcfirst($shorten);
    }
}