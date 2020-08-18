<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

    Route::apiResource('video', 'VideoController')->except([
        'destroy', 'update'
    ]);


    Route::match(['get', 'head'], 'tags', 'TagController@all');
    //Route::get('video/{video}/tags', 'TagController@index');
    Route::post('/tags', 'TagController@store');

});

Route::get('dump', function() {
    $video = \App\Models\Video::first();

    $video->tags()->saveMany(\App\Models\Tag::all());

    dd($video->tags);
});