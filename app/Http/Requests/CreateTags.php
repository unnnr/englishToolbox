<?php

namespace App\Http\Requests;

use App\Http\Requests\JsonRequest;

class CreateTags extends JsonRequest
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
            'data' => 'required|array|between:1,20',
            'data.label' => 'required|string|unique:tags|max:40',
            'data.color' => 'required|string|max:40',
            'data.returne' => 'required|string|boolean',
        ];
    }
}
