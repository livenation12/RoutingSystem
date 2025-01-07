<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RoutingLog extends Model
{
    protected $fillable = [
        'routingSlipId',
        'status',
    ];

    public function routingSlip()
    {
        return $this->belongsTo(RoutingSlip::class);
    }
}
