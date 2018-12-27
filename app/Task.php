<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = ['target', 'duration', 'finished'];
    protected $casts = ['created_at' => 'timestamp'];
}
