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

Route::apiResource('video', 'VideoApiController')->except([
    'destroy', 'update'
]);

Route::match(['get', 'head'], 'tags', 'TagController@all');
Route::apiResource('video.tags', 'TagController')->except([
    'destroy', 'update'
])->shallow();