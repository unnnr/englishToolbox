<?php

namespace App\Services;

use Intervention\Image\ImageManagerStatic as Image;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Resources\AvatarResource;
use App\Models\Avatar;

class AvatarService 
{
    private function randomAvatarName() : string
    {
        do {
            $name = Str::random(40) . '.jpeg';
            $path = Storage::path(Avatar::STORAGE_PATH .'/'. $name);
        }
        while (file_exists($path));

        return $name;
    } 

    private function createAvatar(object $file) : string 
    {
        $filename = $this->randomAvatarName();
        $width = Avatar::IMAGE_HEIGHT;
        $path = Storage::path(Avatar::STORAGE_PATH . '/'. $filename);

        Image::make($file)
            ->fit($width)
            ->save($path);

        return $filename;
    }

    public function update(Request $request)
    {
        $avatar = auth()->user()->avatar;
        
        // Removing previous
        Storage::delete(Avatar::STORAGE_PATH .'/'. $avatar->name);
        
        // Creating new
        $filename = $this->createAvatar($request->file('avatar'));

        // Updating db
        $avatar->update([
            'name' => $filename
        ]);

        return new AvatarResource($avatar);
    }

    public function get()
    {
        return new AvatarResource(auth()->user()->avatar);
    }
}