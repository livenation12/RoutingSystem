<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CounterTracker extends Model
{
    protected $table = 'counter_tracker';
    protected $fillable = [
        'officeAbbr',
        'monthYear',
        'counter'
    ];

    public $timestamps = false;
}
