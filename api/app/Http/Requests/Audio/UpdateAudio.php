<?php

namespace App\Http\Requests\Audio;

use App\Http\Requests\Post\UpdatePost;

class UpdateAudio extends UpdatePost
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
            'imageFile' => 'max:10240|mimes:png,jpeg,gif',
            'audioFile' => 'max:10240|mimes:mpga,wav',
            'title' => 'max:65',
        ];

        return array_merge($post, $audio);
    }
}
