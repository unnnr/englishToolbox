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

    Route::apiResource('bans', 'BanController')
        ->only(['index', 'store', 'destroy']);

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

    Route::get('profile', 'UserController@index');
    Route::patch( 'profile', 'UserController@update');
    Route::delete( 'profile', 'UserController@delete');

    Route::get('profile/comments', 'CommentController@attachedToUser');
    Route::delete('profile/comments', 'CommentController@deleteAttachedToUser');

    Route::get('profile/avatar', 'AvatarController@index');
    Route::patch( 'profile/avatar', 'AvatarController@update');

    Route::post('profile/favorites/{postType}', 'FavoriteController@store');
    Route::delete('profile/favorites/{postType}/{postId}', 'FavoriteController@destroy');
    Route::apiResource('profile/favorites', 'FavoriteController')
        ->only(['index', 'destroy']);
});