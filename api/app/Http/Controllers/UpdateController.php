<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Services\UpdateService;


class UpdateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(UpdateService $service)
    {
        return $service->all();
    }
}
