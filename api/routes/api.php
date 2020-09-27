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

    Route::apiResource('videos', 'VideoController');

    Route::apiResource('audio', 'AudioController');

	Route::apiResource('tags', 'TagController');
    
    Route::apiResource('updates', 'UpdateController')->only(['index']);
    
    Route::apiResource('comments', 'CommentController')->only(['update', 'destroy', 'show']);
    
    Route::apiResource('{postType}/{postId}/comments', 'CommentController')->only(['store', 'index']);

    Route::post('register', 'UserController@register');

    Route::post('login', 'UserController@login');

    Route::post('logout', 'UserController@logout');

    Route::get('verify/{id}/{hash}', 'VerificationController@verifyMail')->name('verify');
});


Route::match(['head', 'get'], 'profile', 'UserController@index');
Route::match(['put', 'patch'], 'profile', 'UserController@update');
Route::delete('profile', 'UserControlle@delete');


Route::middleware('auth:sanctum')->get('test', function() {
    return auth()->user();
});