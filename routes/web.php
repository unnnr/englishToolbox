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

Auth::routes([
    'reset' => false,
    'verify' => false
]);

Route::post('audio', 'AudioController@store');
Route::get('audio', 'AudioController@index')->name('audio');

Route::post('schemas', 'SchemaController@store');
Route::get('schemas', 'SchemaController@index')->name('schemas');

Route::post('videos', 'VideoController@create');
Route::get('videos', 'VideoController@index')->name('videos');

Route::get('/',  'HomeController@index');
Route::get('/home', 'HomeController@index')->name('home');

Route::get('recomend', function(){ return view("recomend");})->name('recomend');

