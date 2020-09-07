<?php

namespace App\Services;
use Illuminate\Database\Eloquent\Model;
use App\Models\Update;

class UpdateService
{
    protected $updateLimit  = 30; 

    public function create(Model $post)
    {
        $update = $post->updateInstance()->create(
            $post->convertToUpdate()
        );

        return $post;
    }

    public function get(Model $post)
    {
        $update = $post->updateInsatace;

        return $update;
    }

    public function all()
    {
        $all = Update::all();

        return $all;
    }

    public function update(Model $post)
    {
        $post->updateInstance()->update(
            $post->convertToUpdate()
        );

        return $post;
    }

    public function delete()
    {
        $post->updateInstance()->delete();
    }
}
