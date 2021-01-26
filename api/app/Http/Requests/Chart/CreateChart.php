<?php

namespace App\Http\Requests\Chart;

use App\Http\Requests\Post\CreatePost;

class CreateChart extends CreatePost
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
            'image' => 'required|max:10240|mimes:png,jpeg,gif',
            'title' => 'required|string|max:65',
        ];

        return array_merge($post, $chart);
    }
}
