<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AudioController extends Controller
{
    public function index()
    {
        return view('audio');
    }

    public function create(Request $request)
    {
        dd(12);
    }
}
