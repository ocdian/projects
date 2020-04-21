<?php

use App\Mail\NewUserWelcomeMail;
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


Auth::routes();


Route::get('/email', function() {
    return new NewUserWelcomeMail();
});
Route::get('/', 'PostsController@index');
Route::post('follow/{user}', 'FollowsController@store');
//Route::post('/follow/{user}', 'FollowsController@store');
Route::get('/p/create', 'PostsController@create');
Route::get('/p/{post}', 'PostsController@show');
Route::post('/p', 'PostsController@store');
//the method edit() in the Profiles Controller will point us to the view
//which contains the form in which we'll edit the profile
//while update() will actually apply the changes we did
Route::get('/profile/index', 'ProfilesController@index');
Route::get('/profile/{user}/edit', 'ProfilesController@edit')->name('profile.edit');
Route::get('/profile/{user}', 'ProfilesController@show')->name('profile.show');
Route::patch('/profile/{user}', 'ProfilesController@update')->name('profiles.update');
//Route::get('/home', 'HomeController@index');