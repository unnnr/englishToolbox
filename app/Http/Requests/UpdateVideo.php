<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Alaouy\Youtube\Rules\ValidYoutubeVideo;

class UpdateVideo extends FormRequest
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
            'tags' => ['array', 'max:4'],  
            'tags.*' => ['numeric', 'distinct'],
            'mainTag' => ['numeric'],
            'videoUrl' => ['string', 'max:300',  new ValidYoutubeVideo],
            'description' => ['string', 'nullable', 'max:180'],
        ];
    }
}
