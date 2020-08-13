<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Alaouy\Youtube\Rules\ValidYoutubeVideo;

use App\Rules\YoutubeID;

class UploadVideo extends FormRequest
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
        //  'unique:videos,videoID'

        return [
            'video_url' => ['required', 'max:300',  new ValidYoutubeVideo],
            'description' => ['max:300']
        ];
    }
}
