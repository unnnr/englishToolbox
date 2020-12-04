<?php

namespace App\Http\Requests\Chart;

use App\Http\Requests\Post\UpdatePost;

class UpdateChart extends UpdatePost
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        // Default post rules
        $post = parent::rules();

        // Only chart rules
        $chart = [
            'image' => 'max:10240|file|mimes:png,jpeg,gif',
            'title' => 'string|max:50',
        ];

        return array_merge($post, $chart);
    }
}