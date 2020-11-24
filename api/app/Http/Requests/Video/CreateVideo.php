<?php

namespace App\Http\Requests\Video;

use Alaouy\Youtube\Rules\ValidYoutubeVideo;
use App\Http\Requests\Post\CreatePost;

class CreateVideo extends CreatePost
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

        // Only video rules
        $video = [
            'videoUrl' => ['required', 'string',  new ValidYoutubeVideo]
        ];

        return array_merge($post, $video);
    }
}
