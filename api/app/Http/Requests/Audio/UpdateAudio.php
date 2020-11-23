<?php

namespace App\Http\Requests\Audio;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAudio extends FormRequest
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
            'title' => 'max:50',
            'description' => 'max:180',

            'audioFile' => 'max:10240|mimes:mpga,wav',
            'imageFile' => 'max:10240|image',

            'tags' => ['array', 'max:4', 'nullable'],  
            'tags.*' => ['numeric', 'distinct'],
            'mainTag' => ['numeric', 'nullable'],
        ];
    }
}
