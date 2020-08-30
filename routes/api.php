<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Cookie;

use App\Models\Tag;
use App\Models\Video;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['namespace' => 'Api'], function() {

    Route::apiResource('video', 'VideoController');

    Route::apiResource('audio', 'AudioController');

	Route::apiResource('tags', 'TagController');
    
    



    Route::post('register', 'UserController@register');
    
	Route::post('login', 'UserController@login');
});

Route::get('dump', function(Request $request) {
    
    dump( $request->all());
    dump( $request->session()->all());
    dump(Cookie::get());
    dd(Auth::user());
})->middleware('web');