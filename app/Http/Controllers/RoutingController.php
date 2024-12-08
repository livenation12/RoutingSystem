<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoutingSlip\StoreRoutingSlipRequest;
use App\Http\Resources\RoutingSlip\RoutingSlipMinResource;
use App\Http\Resources\RoutingSlipResource;
use App\Http\Resources\TransactionResource;
use App\Models\Office;
use App\Models\Remarks;
use App\Models\RoutingSlip;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class RoutingController extends Controller
{
    public function index(Request $request)
    {
        $paginate = $request->input('paginate', 10);
        $search = $request->input('search', '');
        $sort = $request->input('sort', 'id');
        $direction = $request->input('direction', 'desc');
        $query = RoutingSlip::query();

        // If search is provided, filter by the 'fromUser' firstName and lastName
        if ($search) {
            $query->whereHas('fromUser', function ($query) use ($search) {
                $query->where('firstName', 'like', "%$search%")
                    ->orWhere('lastName', 'like', "%$search%");
            });
            $query->orWhere('docTin', 'like', "%$search%");
        }
        
        $query->orderBy($sort, $direction);

        // Fetch the routings with pagination
        $routings = $query->with('fromUser')->paginate($paginate);

        // Return the results to the Inertia page with pagination links and search value
        return inertia("RoutingSlip/Index", [
            'routings' => RoutingSlipMinResource::collection($routings),
            'search' => $request->search,
            'sortColumn' => $request->sort,
            'sortDirection' => $request->direction,
        ]);
    }



    public function show(RoutingSlip $routingSlip)
    {
        $routingSlip->load(['transaction', 'transaction.proposal', 'transaction.proposal.attachments', 'fromUser']);
        return inertia("RoutingSlip/Show", [
            'routingSlip' => new RoutingSlipResource($routingSlip)
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

    public function full() {}
}
