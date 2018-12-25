<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Task;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Task::all();
        return response()->json($tasks);
    }

    public function store(Request $request)
    {
        $task = new Task([
            'target' => $request->get('target'),
            'duration' => $request->get('duration'),
            'status' => 'Актуальная'
        ]);
        $task->save();
    }

    public function edit($id)
    {
        $task = Task::find($id);
        return response()->json($task);
    }

    public function update(Request $request, $id)
    {
        $task = Task::find($id);
        $task->target = $request->get('target');
        $task->duration = $request->get('duration');
        $task->save();
    }

    public function destroy($id)
    {
        $task = Task::find($id);
        $task->delete();
    }
}