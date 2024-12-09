<?php

namespace App\Http\Controllers\Receiver;

use App\Http\Controllers\Controller;
use App\Http\Resources\Transaction\TransactionResource;
use App\Models\Transaction;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search', '');
        $query = Transaction::query();
        if ($search) {
            $query->whereHas('proposal', function ($query) use ($search) {
                $query->where('trackingId', 'like', "%$search%")
                    ->orWhere('title', 'like', "%$search%")
                    ->orWhere('source', 'like', "%$search%");
            });
        }
        // Eager load the 'proposal' relationship
        $transactions = $query->with(['proposal', 'routingSlips', 'routingSlips.fromUser'])  // Add 'proposal' here to eager load it
            ->orderBy('id', 'desc')
            ->paginate($this->pageCount);

        return inertia('Receiver/Dashboard', [
            "transactions" => TransactionResource::collection($transactions),
            "search" => $search
        ]);
    }

    public function proposalCreate()
    {
        return inertia("Receiver/ProposalCreate");
    }
}
