<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Http\Resources\AvatarResource;

class AvatarService 
{
    const AVATARS_PATH = 'public/avatars';

    public function get()
    {
        return new AvatarResource(auth()->user()->avatar);
    }

    public function update(Request $request)
    {
        $path = $request->file('avatar')->store(self::AVATARS_PATH);

        $avatar = auth()->user()->avatar;
        $avatar->update([
            'name' => basename($path)
        ]);

        return new AvatarResource($avatar);
    }
}