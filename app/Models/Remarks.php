<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Remarks extends Model
{
    protected $table = 'remarks';
    protected $fillable = [
        'routingSlipId',
        'message',
        'office',
    ];

    public function routingSlip()
    {
        return $this->belongsTo(RoutingSlip::class);
    }
}
