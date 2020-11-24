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
        // Defualt post rules
        $post = parent::rules();

        // Only audio rules
        $audio = [
            'audioFile' => 'max:10240|mimes:mpga,wav',
            'imageFile' => 'max:10240|mimes:png,jpeg,gif',
            'title' => 'max:50',
        ];

        return array_merge($post, $audio);
    }
}
