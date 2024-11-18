<?php

namespace App\Http\Controllers\Receiver;

use App\Http\Controllers\Controller;
use App\Http\Resources\TransactionResource;
use App\Models\Transaction;

class DashboardController extends Controller
{
    public function index()
    {
        $query = Transaction::query();

        // Eager load the 'proposal' relationship
        $transactions = $query->with(['proposal', 'routingSlips', 'routingSlips.fromUser'])  // Add 'proposal' here to eager load it
            ->orderBy('id', 'desc')
            ->paginate(10);
        return inertia('Receiver/Dashboard', [
            "transactions" => TransactionResource::collection($transactions)
        ]);
    }

    public function proposalCreate()
    {
        return inertia("Receiver/ProposalCreate");
    }
}
