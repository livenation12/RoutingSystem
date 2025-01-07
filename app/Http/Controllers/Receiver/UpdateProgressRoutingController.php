<?php

namespace App\Http\Controllers\Receiver;

use App\Http\Controllers\Controller;
use App\Models\RoutingLog;
use App\Models\RoutingSlip;
use DB;
use Illuminate\Http\Request;

class UpdateProgressRoutingController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, RoutingSlip $routingSlip)
    {
        $validatedRequest = $request->validate([
            'status' => 'required'
        ]);
        DB::beginTransaction();
        try {
            // Step 1: Fetch the RoutingSlips based on the transactionId
            $routings = RoutingSlip::where('transactionId', $routingSlip->transactionId)->get();

            // Step 2: Update the status of the fetched RoutingSlips
            $routings->each(function ($routing) use ($validatedRequest) {
                $routing->status = $validatedRequest['status'];
                $routing->save();
            });

            // Step 3: Create RoutingLog entries for each updated RoutingSlip
            foreach ($routings as $routing) {
                RoutingLog::create([
                    'routingSlipId' => $routing->id,
                    'status' => $validatedRequest['status']
                ]);
            }
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error($e);
        }
    }
}
