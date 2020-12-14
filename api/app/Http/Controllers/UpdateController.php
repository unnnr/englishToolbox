<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Services\UpdateService;


class UpdateController extends Controller
{
    public function __construct() 
    {
        $this->service = new UpdateService();
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->service->all();
    }
}
