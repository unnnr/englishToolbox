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

Route::post('images', 'SchemaController@store');
Route::get('images', 'SchemaController@index')->name('schemas');

Route::get('/',  'HomeController@index');
Route::get('home', 'HomeController@index')->name('home');