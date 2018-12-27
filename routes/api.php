<?php

use Illuminate\Http\Request;
use App\Task;

Route::resource('task', 'TaskController');
Route::post('end/{id}', function ($id) {
    $task = Task::find($id);
    $task->finished = true;
    $task->save();
});