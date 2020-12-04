<?php

namespace App\Http\Requests\Video;

use Alaouy\Youtube\Rules\ValidYoutubeVideo;
use App\Http\Requests\Post\UpdatePost;

class UpdateVideo extends UpdatePost
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

        // Only video rules
        $video = [
            'videoUrl' => ['string',  new ValidYoutubeVideo]
        ];

        return array_merge($post, $video);
    }
}
