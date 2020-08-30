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

    Route::get('videos', 'VideoController@index')->name('videos');

    Route::get('audio', 'AudioController@index')->name('audio');

    Route::get('login', 'LoginController@index')->name('login');

    Route::get('register', 'RegisterController@index')->name('register');
});


Route::post('schemas', 'SchemaController@store');
Route::get('schemas', 'SchemaController@index')->name('schemas');


Route::get('/',  'HomeController@index');
Route::get('/home', 'HomeController@index')->name('home');

Route::get('recomend', function(){ return view("recomend");})->name('recomend');
Route::get('account', function(){ return view("account");})->name('account');