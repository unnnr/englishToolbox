<?php

namespace App\Http\Requests\Whiteboard;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Status;

class ClearWhiteboard extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $user = auth()->user();

        if ($user->admin)
            return true;

        if (!!!$user->banned &&  Status::of('whiteboard')->is('unlocked'))
            return true;

        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            //
        ];
    }
}
