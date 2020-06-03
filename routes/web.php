<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/


Route::get('/', function () {
    return view('welcome');
});

Route::get('/clients_json', 'ClientController@indexJson')->name('client.json');
Route::get('/clients', 'ClientController@index')->name('client.index');
Route::get('/clients_datatable', 'ClientController@indexDatatable')->name('client.index_datatable');
Route::get('/clients/create', 'ClientController@create');
Route::post('/clients/store', 'ClientController@store')->name('client.store');
Route::get('/clients/show/{client}', 'ClientController@show');
Route::get('/clients/edit/{client}', 'ClientController@edit');
Route::post('/clients/update/{client}', 'ClientController@update')->name('client.update');
Route::post('/clients/destroy/{client}', 'ClientController@destroy')->name('client.destroy');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
