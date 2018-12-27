<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTasksTable extends Migration
{
   
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->string('target');
            $table->integer('duration');
            $table->boolean('finished');
        });
    }

    public function down()
    {
        Schema::dropIfExists('tasks');
    }
}
