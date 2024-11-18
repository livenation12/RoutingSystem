<?php

namespace App\Http\Controllers\OfficeHead;

use App\Http\Controllers\Controller;
use App\Http\Resources\RoutingSlipResource;
use App\Http\Resources\TransactionResource;
use App\Models\Office;
use App\Models\RoutingSlip;
use App\Models\Transaction;
use Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $perPage = 10; // Adjust this number as needed
        $officesToEndorsedTo = Office::endorsedToOptions(); // Fetch offices to endorse to 

        $transactions = Transaction::whereHas('routingSlips', function ($query) {
            $query->where('fromUserId', Auth::user()->id); // Ensure fromUserId in Proposal matches the authenticated user
        })
            ->with(['proposal', 'routingSlips', 'routingSlips.fromUser']) // Eager load the related proposal and routingSlips
            ->orderBy('id', 'desc')
            ->paginate($perPage);

        // $routings = RoutingSlip::where('fromUserId', Auth::user()->id)
        //     ->with('transaction')
        //     ->orderBy('id', 'desc')
        //     ->paginate($perPage);

        return inertia('OfficeHead/Dashboard', [
            // 'routings' => RoutingSlipResource::collection($routings),
            'transactions' => TransactionResource::collection($transactions),
            'officesToEndorsedTo' => $officesToEndorsedTo
        ]);
    }
}
