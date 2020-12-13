<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class BanUser extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->user()->admin;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'user' => 'required|integer',
            'reason' => 'string'
        ];
    }
}
