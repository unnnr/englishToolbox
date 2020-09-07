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
    
    Route::apiResource('updates', 'UpdateController')->only(['index']);
    
    Route::apiResource('comments', 'CommentController')->only(['update', 'destroy', 'show']);
    
    Route::apiResource('{postType}/{postId}/comments', 'CommentController')->only(['store', 'index']);
});

Route::match(['head', 'get'], 'profile', 'UserController@index');
Route::match(['put', 'patch'], 'profile', 'UserController@update');
Route::delete('profile', 'UserControlle@delete');


Route::middleware('auth:sanctum')->get('dump', function(Request $request) {
    return $request->user();
});