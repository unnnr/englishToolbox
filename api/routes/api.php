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

Route::group(['namespace' => 'Api'], function() 
{
    /*
    |--------------------------------------------------------------------------
    | Reosouces
    |--------------------------------------------------------------------------
    */

    Route::apiResource('videos', 'VideoController');

    Route::apiResource('audio', 'AudioController');

	Route::apiResource('tags', 'TagController');
    
    Route::apiResource('updates', 'UpdateController')
        ->only(['index']);

    Route::apiResource('comments', 'CommentController')
        ->only(['update', 'destroy', 'show']);
    Route::apiResource('{postType}/{postId}/comments', 'CommentController')
        ->only(['store', 'index']);

    Route::get('reviews/verified', 'ReviewController@verified');
    Route::get('reviews/pending', 'ReviewController@pending');
    Route::apiResource('reviews', 'ReviewController')
        ->except(['show']);

    /*
    |--------------------------------------------------------------------------
    | Auth
    |--------------------------------------------------------------------------
    */

    Route::post('register', 'AuthController@register');
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');

    Route::get('verify/{id}/{hash}', 'UserController@verifyMail')->name('verify');

    /*
    |--------------------------------------------------------------------------
    | Profile routes
    |--------------------------------------------------------------------------
    */

    Route::match(['head', 'get'], 'profile', 'UserController@index');
    Route::match(['put', 'patch'], 'profile', 'UserController@update');
    Route::match(['delete'], 'profile', 'UserController@delete');

    Route::match(['head', 'get'], 'profile/comments', 'CommentController@attachedToUser');
    Route::match(['delete'], 'profile/comments', 'CommentController@deleteAttachedToUser');

    Route::match(['head', 'get'], 'profile/avatar', 'AvatarController@index');
    Route::match(['put', 'patch'], 'profile/avatar', 'AvatarController@update');

    Route::apiResource('banned', 'BanController')
        ->only(['index', 'store', 'destroy']);
});



/* 
Route::middleware('auth:sanctum')->get('test', function() {
    return auth()->user();
}); */