<?php

use Illuminate\Database\Seeder;
use App\Task;

class TasksTableSeeder extends Seeder
{
    
    public function run()
    {
       for ($i = 1; $i <= 10; $i++) {
            Task::create([
                'target' => 'Цель ' . $i,
                'duration' => random_int(1, 300),
                'finished' => false
            ]);
        }
    }
}
