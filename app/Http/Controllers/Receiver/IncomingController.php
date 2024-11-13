<?php

namespace App\Http\Controllers\Receiver;

use App\Http\Controllers\Controller;
use App\Http\Requests\Proposal\StoreProposalRequest;
use App\Models\Proposal;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;

class IncomingController extends Controller
{
    public function store(StoreProposalRequest $request)
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

            return redirect()->route('receiver.dashboard');
        }

        return redirect()->back()->withInput()->withErrors(['attachment' => 'No attachment found.']);
    }

    public function create()
    {
        return inertia("Receiver/IncomingCreate");
    }
}

