<?php

namespace App\Http\Controllers\OfficeHead\Routing;

use App\Http\Controllers\Controller;
use App\Models\RoutingSlip;
use Illuminate\Http\Request;

class RevertRoutingController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function form(RoutingSlip $routingSlip)
    {
        return inertia('OfficeHead/RevertRouting', [
            'routingSlip' => $routingSlip
        ]);
    }
}
