<?php

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

Route::get('/', function () {
    return view('welcome');
});

Route::get('/tasks', 'TaskController@listaTudo');

Route::get('/tasks/{id}', 'TaskController@lista');

Route::post('/tasks', 'TaskController@novo');

Route::put('/tasks/{id}', 'TaskController@editar');

Route::delete('/tasks/{id}', 'TaskController@excluir');