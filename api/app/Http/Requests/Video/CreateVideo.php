<?php

namespace App\Http\Requests\Video;

use Illuminate\Foundation\Http\FormRequest;
use Alaouy\Youtube\Rules\ValidYoutubeVideo;

use App\Rules\YoutubeID;

class CreateVideo extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
             //  'unique:videos,videoID'
            'description' => ['string', 'max:180'],
            'videoUrl' => ['required', 'string',  new ValidYoutubeVideo],
            'mainTag' => ['numeric'],
            'tags' => ['array', 'max:4'],  
            'tags.*' => ['numeric', 'distinct']
        ];
    }
}
