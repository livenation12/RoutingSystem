<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoutingSlip\StoreRoutingSlipRequest;
use App\Http\Resources\RoutingSlip\RoutingSlipMinResource;
use App\Http\Resources\TransactionResource;
use App\Models\Office;
use App\Models\Remarks;
use App\Models\RoutingSlip;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;

class RoutingSlipController extends Controller
{
    public function index()
    {
        RoutingSlipMinResource::withoutWrapping();
        $query = RoutingSlip::query();
        $routingSlips = $query->orderBy('docTin', 'desc')->paginate(10);
        return inertia("RoutingSlip/Index", [
            'routingSlips' => RoutingSlipMinResource::collection($routingSlips),
        ]);
    }

    public function create(Transaction $transaction)
    {
        $offices = Office::all();
        TransactionResource::withoutWrapping();
        return inertia("Shared/RoutingSlip/RoutingSlipCreate", [
            'transaction' => new TransactionResource($transaction),
            'offices' => $offices
        ]);
    }

    public function store(StoreRoutingSlipRequest $request)
    {
        $validatedRequest = $request->validated();
        // Ensure docTin is being added to the validated request array
        $validatedRequest['docTin'] = RoutingSlip::generateDocTin();
        $validatedRequest['fromUserId'] = Auth::user()->id;

        // Create the RoutingSlip and return
        $routingSlip = RoutingSlip::create($validatedRequest);
        if (!empty($validatedRequest['remarks'])) {
            dd($validatedRequest);
            // Create a new remark
            Remarks::create([
                'message' => $validatedRequest['remarks'],
                'routingSlipId' => $routingSlip->id,
                'officeName' =>  $routingSlip->endorsedTo->officeName
            ]);
        }
        return redirect()->route('routing-slip.index');
    }
}
