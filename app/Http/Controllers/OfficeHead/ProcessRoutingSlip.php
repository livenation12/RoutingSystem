<?php

namespace App\Http\Controllers\OfficeHead;

use App\Http\Controllers\Controller;
use App\Http\Requests\OfficeHead\ProcessRoutingSlipRequest;
use App\Models\Office;
use App\Models\Remarks;
use App\Models\RoutingSlip;
use App\Models\Transaction;
use App\Notifications\UserActionNotification;
use Auth;

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

    public function process(ProcessRoutingSlipRequest $request, RoutingSlip $routingSlip)
    {
        // Validate and retrieve the validated data from the request
        $validated = $request->validated();
        // Check if 'endorsedToOfficeId' is not provided
        if (empty($validated['endorsedToOfficeId'])) {
            //find the transaction and record the accomplishment date
            $transaction = Transaction::findOrFail($routingSlip->transactionId);
            // Check if transaction exists before accessing its properties
            if ($transaction) {
                //if not endorsed to any office, set the accomplishment date
                $receiver =  Auth::user();
                $transaction->accomplishmentDate = now();
                $transaction->save();
                $receiver->notify(new UserActionNotification("Office Head has accomplished the transaction with DocTin{$transaction->routingSlip->docTin}"));
            } else {
                // Handle the case where the transaction is not found
                return to_route(
                    'office-head.routing-slip.form',
                    ['routingSlip' => $routingSlip]
                )
                    ->withErrors(['message' => 'Transaction not found.']);
            }
        }

        // Update the routing slip with validated data
        $routingSlip->update($validated);
        // Create a remark associated with the routing slip
        Remarks::create([
            'routingSlipId' => $routingSlip->id,
            'message' => $validated['remarks'],
            'office' => Auth::user()->office->officeName,
        ]);

        //initialize routing slip for the next routing
        RoutingSlip::create([
            'transactionId' => $routingSlip->transactionId,
            'fromUserId' => $routingSlip->endorsedTo->officeHead->id,
        ]);

        // Return a success response (optional)
        return to_route('office-head.dashboard');
    }
}
