<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUser extends FormRequest
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
            'name' => 'string|between:3,32',
            'email' => 'email',
            'newPassword' => 'string|between:5,64',
            'confirmation' => 'string|same:newPassword',
            'password' => 'required|string',
        ];
    }
}
