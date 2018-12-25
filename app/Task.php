<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = ['target', 'duration', 'status'];
    protected $casts = ['created_at' => 'timestamp'];
}
