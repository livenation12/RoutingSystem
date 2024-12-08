<?php

namespace App\Http\Controllers\DepartmentHead;

use App\Http\Controllers\Controller;
use App\Http\Requests\RoutingSlip\ProcessRoutingSlipRequest;
use App\Models\Office;
use App\Models\Remarks;
use App\Models\RoutingSlip;
use App\Models\Transaction;
use Auth;
use Illuminate\Http\Request;

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
        // Update the routing slip with validated data
        $routingSlip->update($validated);
        // Create a remark associated with the routing slip
        Remarks::create([
            'routingSlipId' => $routingSlip->id,
            'message' => $validated['remarks'],
            'office' => $routingSlip->endorsedTo->officeName,
        ]);

        // Check if 'endorsedToOfficeId' is not provided
        if (empty($validated['endorsedToOfficeId'])) {

            $transaction = Transaction::find($routingSlip->transactionId);

            // Check if transaction exists before accessing its properties
            if ($transaction) {
                $transaction->accomplishmentDate = now();
                $transaction->save();
            } else {
                // Handle the case where the transaction is not found (optional)
                return to_route('department-head.routing-slip.form', ['routingSlip' => $routingSlip])->withErrors(['message' => 'Transaction not found.']);
            }
        } else {
            //initialize routing slip for the next routing
            RoutingSlip::create([
                'transactionId' => $routingSlip->transactionId,
                'fromUserId' => $routingSlip->endorsedTo->officeHead->id,
            ]);
        }

        // Return a success response (optional)
        return to_route('department-head.dashboard');
    }
}
