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

            'audioFile' => 'required|max:10240|mimes:mpga,wav',
            'imageFile' => 'required|max:10240|image',

            'mainTag' => 'nullable|numeric',  
            'tags.*' => 'numeric|distinct',
            'tags' => 'array|nullable|max:4'
        ];
    }
}
