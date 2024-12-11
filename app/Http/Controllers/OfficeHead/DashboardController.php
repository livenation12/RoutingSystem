<?php

namespace App\Http\Controllers\OfficeHead;

use App\Http\Controllers\Controller;
use App\Http\Resources\RoutingSlipResource;
use App\Http\Resources\Transaction\TransactionResource;
use App\Models\Office;
use App\Models\RoutingSlip;
use App\Models\Transaction;
use Auth;
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
        $transactions = Transaction::whereHas('routingSlips', function ($query) {
            $query->where('fromUserId', Auth::user()->id); // Ensure fromUserId in Proposal matches the authenticated user
        })
            ->with(['proposal', 'routingSlips', 'routingSlips.fromUser']) // Eager load the related proposal and routingSlips
            ->orderBy('id', 'desc')
            ->paginate($this->pageCount);

        return inertia('OfficeHead/Dashboard', [
            // 'routings' => RoutingSlipResource::collection($routings),
            'transactions' => TransactionResource::collection($transactions),
            'officesToEndorsedTo' => Office::endorsedToOptions()
        ]);
    }
}
