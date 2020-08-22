<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UploadAudio extends FormRequest
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
            'title' => 'required|max:50',
            'description' => 'max:180',

            'audio' => 'required|max:10240|mimes:mpga,wav',
            'thumbnail' => 'required|max:10240|image',

            'mainTag' => 'numeric',  
            'tags.*' => 'numeric|distinct',
            'tags' => 'array|max:4'
        ];
    }
}
