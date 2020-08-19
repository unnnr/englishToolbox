<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

    Route::apiResource('video', 'VideoController')->except([
        'destroy',
    ]);


    Route::match(['get', 'head'], 'tags', 'TagController@all');
    //Route::get('video/{video}/tags', 'TagController@index');
    Route::post('/tags', 'TagController@store');

});

Route::get('dump', function() {
    dd(Video::find(7)->tags);
});