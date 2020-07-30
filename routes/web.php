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

Route::get('images', 'ImageController@index');
Route::post('images', 'ImageController@create');

Route::middleware(['auth'])->group(function ()
{
    Route::get('/',  'HomeController@index');
    Route::get('/home', 'HomeController@index')->name('home');   
});