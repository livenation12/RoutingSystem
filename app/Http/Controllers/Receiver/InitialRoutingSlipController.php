<?php

namespace App\Http\Controllers\Receiver;

use App\Http\Controllers\Controller;
use App\Http\Requests\Receiver\InitializeRoutingSlipRequest;
use App\Http\Resources\TransactionResource;
use App\Models\RoutingSlip;
use App\Models\Transaction;

class InitialRoutingSlipController extends Controller
{
    public function initialize(InitializeRoutingSlipRequest $request, Transaction $transaction)
    {
        $validated = $request->validated();
        RoutingSlip::create([
            ...$validated,
            'transactionId' => $transaction->id,
            'fromUserId' => 4
        ]);
        return to_route('receiver.dashboard');
    }

    public function create(Transaction $transaction)
    {
        TransactionResource::withoutWrapping();
        return inertia("Receiver/InitialRoutingSlipCreate", [
            'transaction' => new TransactionResource($transaction),
        ]);
    }
}
