<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class RoutingLog extends Model
{
    use Notifiable;
    
    protected $fillable = [
        'routingSlipId',
        'status',
    ];

    public function routingSlip()
    {
        return $this->belongsTo(RoutingSlip::class);
    }
}
