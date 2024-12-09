<?php

namespace App\Http\Controllers\DepartmentHead;

use App\Http\Controllers\Controller;
use App\Http\Resources\RoutingSlipResource;
use App\Http\Resources\Transaction\TransactionResource;
use App\Models\Office;
use App\Models\RoutingSlip;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $perPage = 10; // Adjust this number as needed
        $officesToEndorsedTo = Office::endorsedToOptions();
        $transactions = Transaction::whereHas('routingSlips', function ($query) {
            $query->where('fromUserId', Auth::user()->id); // Ensure fromUserId in Proposal matches the authenticated user
        })
            ->with(['proposal', 'routingSlips', 'routingSlips.fromUser']) // Eager load the related proposal and routingSlips
            ->orderBy('id', 'desc')
            ->paginate($perPage);

        // Return the data to your Inertia view
        return inertia('DepartmentHead/Dashboard', [
            'officesToEndorsedTo' => $officesToEndorsedTo,
            'transactions' => TransactionResource::collection($transactions)
        ]);
    }
}














// class DashboardController extends Controller
// {
//     public function index()
//     {
//         $perPage = 10; // Adjust this number as needed
//         $officesToEndorsedTo = Office::endorsedToOptions();
//         // Fetch paginated records
//         $routings = RoutingSlip::where('fromUserId', Auth::user()->id)
//             ->with(['transaction', 'transaction.proposal'])
//             ->orderBy('id', 'desc')
//             ->paginate($perPage);
//         // Return the data to your Inertia view
//         return inertia('DepartmentHead/Dashboard', [
//             'routings' => RoutingSlipResource::collection($routings),
//             'officesToEndorsedTo' => $officesToEndorsedTo
//         ]);
//     }
// }