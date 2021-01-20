<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class RegisterUser extends FormRequest
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
            'name' => 'required|string|between:3,32',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|between:5,64',
            'confirmation' => 'required|same:password',
            'g-recaptcha-response' => 'required|recaptcha'
        ];
    }
}
