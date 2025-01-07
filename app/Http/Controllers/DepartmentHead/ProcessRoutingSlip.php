<?php

namespace App\Http\Controllers\DepartmentHead;

use App\Http\Controllers\Controller;
use App\Http\Requests\RoutingSlip\ProcessRoutingSlipRequest;
use App\Models\Office;
use App\Models\Remarks;
use App\Models\RoutingLog;
use App\Models\RoutingSlip;
use App\Models\Transaction;
use App\Models\User;
use DB;


class ProcessRoutingSlip extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function form(RoutingSlip $routingSlip)
    {
        $officesToEndorsedTo = Office::endorsedToOptions();
        return inertia('DepartmentHead/ProcessRoutingSlip', [
            'routingSlip' => $routingSlip,
            'officesToEndorsedTo' => $officesToEndorsedTo
        ]);
    }

    /**
     * Process the routing slip with the given request.
     *
     * @param  \App\Http\Requests\RoutingSlip\ProcessRoutingSlipRequest  $request
     * @param  \App\Models\RoutingSlip  $routingSlip
     * @return \Illuminate\Http\RedirectResponse
     */
    public function process(ProcessRoutingSlipRequest $request, RoutingSlip $routingSlip)
    {
        $validated = $request->validated();
        DB::beginTransaction();
        try {
            if (empty($validated['endorsedToOfficeId'])) {
                $transaction = Transaction::find($routingSlip->transactionId);
                $transaction->accomplishmentDate = now();
                $transaction->save();
                $routingSlip->status = 'Accomplished';
                $routingSlip->save();
                RoutingLog::create([
                    'routingSlipId' => $routingSlip->id,
                    'status' => 'Accomplished',
                ]);
            } else {
                $endorsedToHeadId = Office::find($validated['endorsedToOfficeId'])->officeHead->id;
                $endorsedRoutingSlip = RoutingSlip::create([
                    'endorsedByOfficeId' => $routingSlip->fromUser->office->id,
                    'transactionId' => $routingSlip->transactionId,
                    'fromUserId' => $endorsedToHeadId,
                    'status' => 'Pending',
                ]);
                if ($endorsedRoutingSlip) {
                    $routingSlip->status = 'Endorsed';
                    $routingSlip->endorsedToOfficeId = $validated['endorsedToOfficeId'];
                    $routingSlip->save();
                    if ($routingSlip) {
                        Remarks::create([
                            'routingSlipId' => $routingSlip->id,
                            'message' => $validated['remarks'],
                            'office' => $routingSlip->endorsedTo->officeName,
                        ]);
                    }
                    RoutingLog::create([
                        'routingSlipId' => $routingSlip->id,
                        'status' => 'Endorsed',
                    ]);
                } else {
                    \Log::error('Error creating routing slip');
                }
            }
            DB::commit();
            // Return a success response (optional)
            return to_route('department-head.dashboard');
        } catch (\Exception $e) {
            \Log::error('Error endorsing/accomplishing routing slip: ' . $e->getMessage());
            DB::rollBack();
        }
    }
}
