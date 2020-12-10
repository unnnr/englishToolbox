<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Model;
use App\Models\Update;
use App\Http\Resources\UpdateResource;

class UpdateService
{
    public const LIMIT = 20; 

    public function create(Model $post)
    {
        $update = $post->updateInstance()->create();

        return new UpdateResource($update);
    }

    public function get(Model $post)
    {
        $update = $post->updateInstace;

        return new UpdateResource($post);
    }

    public function delete(Model $post)
    {
        $post->updateInstance()->delete();
    }

    public function all()
    {
        $collection = Update::orderBy('id', 'DESC')
            ->limit(self::LIMIT)
            ->get();
            
        return UpdateResource::collection($collection);
    }
}
