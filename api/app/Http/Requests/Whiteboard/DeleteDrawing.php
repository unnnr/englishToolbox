<?php

namespace App\Http\Requests\Whiteboard;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Status;

class DeleteDrawing extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->user()->admin ||
            Status::of('whiteboard')->is('unlocked');
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
