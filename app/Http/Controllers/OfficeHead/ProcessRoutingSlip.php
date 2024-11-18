<?php

namespace App\Http\Controllers\OfficeHead;

use App\Http\Controllers\Controller;
use App\Models\Office;
use App\Models\RoutingSlip;
use Illuminate\Http\Request;

class ProcessRoutingSlip extends Controller
{

    public function form(RoutingSlip $routingSlip)
    {
        $officesToEndorsedTo = Office::endorsedToOptions();

        // Return the data to your Inertia view
        return inertia('OfficeHead/ProcessRoutingSlip', [
            'routingSlip' => $routingSlip,
            'officesToEndorsedTo' => $officesToEndorsedTo
        ]);
    }

    public function process() {}
}
