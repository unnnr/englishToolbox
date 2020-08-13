<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use App\Services\YoutubeService;

class YoutubeID implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $youtube = new YoutubeService();

        return $youtube->validateID($value);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'video url is incorrect or you have used all your yotube quota ';
    }
}
