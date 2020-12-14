<?php

namespace App\Http\Controllers;


use App\Services\ViewService;

class ViewController extends Controller
{
    private $service;

    public function __construct() 
    {
        $this->middleware('auth:sanctum');
        
        $this->service = new ViewService();
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
