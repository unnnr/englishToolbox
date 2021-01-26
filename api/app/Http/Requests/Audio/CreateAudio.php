<?php

namespace App\Http\Requests\Audio;

use App\Http\Requests\Post\CreatePost;

class CreateAudio extends CreatePost
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        // Default post rules
        $post = parent::rules();

        // Only audio rules
        $audio = [
            'audioFile' => 'required|max:10240|mimes:mpga,wav',
            'imageFile' => 'required|max:10240|mimes:png,jpeg,gif',
            'title' => 'required|string|max:65',
        ];

        return array_merge($post, $audio);
    }
}
