<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group(['namespace' => 'Web'], function() {

    Route::get('/',  'HomeController');
    Route::get('/home', 'HomeController')->name('home');

    Route::get('videos', 'VideoController')->name('videos');

    Route::get('audio', 'AudioController')->name('audio');

    Route::get('login', 'LoginController')->name('login');

    Route::get('register', 'RegisterController')->name('register');
    
    Route::get('profile', 'ProfileController')->name('account');
});

Route::post('register', 'UserController@register');
    
Route::post('login', 'UserController@login');


Route::get('schemas', 'SchemaController@index')->name('schemas');




Route::get('recomend', function(){ return view("recomend");})->name('recomend');