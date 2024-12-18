<?php

namespace App\Http\Controllers\OfficeHead\Routing;

use App\Http\Controllers\Controller;
use App\Http\Requests\RevertRoutingRequest;
use App\Models\Office;
use App\Models\Remarks;
use App\Models\RoutingSlip;
use DB;

class RevertRoutingController extends Controller
{

    public function form(RoutingSlip $routingSlip)
    {
        return inertia('OfficeHead/RevertRouting', [
            'routingSlip' => $routingSlip,
            'offices' => Office::all()
        ]);
    }


    public function revert(RevertRoutingRequest $request, RoutingSlip $routingSlip)
    {
        $validated = $request->validated();
        DB::beginTransaction();
        try {
            if (!empty($validated['additionalRemarks'])) {
                $routingSlip->additionalRemarks = $validated['additionalRemarks'];
                $routingSlip->save();
            }
            Remarks::create([
                "message" => $validated['remarks'],
                "routingSlipId" => $routingSlip->id,
                'office' => $validated['office']
            ]);
            if ($routingSlip->transaction) {
                $routingSlip->transaction->accomplishmentDate = now();
                $routingSlip->transaction->save();
            }
            DB::commit();
        } catch (\ErrorException $e) {
            DB::rollBack();
            \Log::error("Error occured while reverting routing slip: " . $e->getMessage());
        }
    }
}
