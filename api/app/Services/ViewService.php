<?php

namespace App\Services;

use App\Http\Resources\ViewResource;
use App\Models\View;

class ViewService
{
    public function all()
    {
        $views = auth()->user()->views;

        return ViewResource::collection($views);
    }
}
