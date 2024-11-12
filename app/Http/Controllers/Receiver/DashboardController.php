<?php

namespace App\Http\Controllers\Receiver;

use App\Http\Controllers\Controller;
use App\Http\Requests\Proposal\StoreProposalRequest;
use App\Http\Resources\TransactionResource;
use App\Models\Proposal;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $query = Transaction::query();

        // Eager load the 'proposal' relationship
        $transactions = $query->with('proposal')  // Add 'proposal' here to eager load it
            ->orderBy('id', 'desc')
            ->paginate(10);

        return inertia('Receiver/Dashboard', [
            "transactions" => TransactionResource::collection($transactions)
        ]);
    }

    public function proposalStore(StoreProposalRequest $request)
    {
        $validatedRequest = $request->validated();
        // Check if the request has a file
        if ($request->hasFile('attachment')) {

            $transaction = Transaction::create([
                'receiverId' => Auth::user()->id
            ]);
            $validatedRequest['transactionId'] = $transaction->id;

            $attachment = $request->file('attachment');

            // Generate a tracking ID
            $trackingId = Proposal::generateTrackingId();

            $validatedRequest['trackingId'] = $trackingId;

            // Get the original file extension
            $fileExtension = $attachment->getClientOriginalExtension();

            $filename = str_replace(' ', '', "{$trackingId}.{$fileExtension}");

            $validatedRequest['attachment'] = $attachment->storeAs(Proposal::getFileDirectory(), $filename, 'public');

            Proposal::create($validatedRequest);

            return redirect()->route('transaction.index');
        }

        return redirect()->back()->withInput()->withErrors(['attachment' => 'No attachment found.']);
    }

    public function proposalCreate()
    {
        return inertia("Receiver/ProposalCreate");
    }
}
