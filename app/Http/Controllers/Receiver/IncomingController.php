<?php

namespace App\Http\Controllers\Receiver;

use App\Http\Controllers\Controller;
use App\Http\Requests\Proposal\StoreProposalRequest;
use App\Models\Attachment;
use App\Models\Proposal;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class IncomingController extends Controller
{

    public function store(StoreProposalRequest $request)
    {
        // Debugging: Ensure files are uploaded
        // dd($request->file('attachments'));

        // Validate the incoming request
        $validatedRequest = $request->validated();

        // Check if the request has files
        if ($request->hasFile('attachments')) {

            // Start a database transaction to ensure atomicity
            DB::beginTransaction();

            try {
                // Create a new transaction record
                $transaction = Transaction::create([
                    'receiverId' => Auth::user()->id
                ]);

                // Generate a unique tracking ID for the proposal
                $trackingId = Proposal::generateTrackingId();

                // Add additional validated data (transactionId and trackingId)
                $validatedRequest['transactionId'] = $transaction->id;
                $validatedRequest['trackingId'] = $trackingId;

                // Process each attachment file
                foreach ($request->file('attachments') as $index => $attachment) {
                    $index ++;
                    // Generate a unique fileName for each file
                    $fileExtension = $attachment->getClientOriginalExtension();
                    $fileName = str_replace(' ', '', "{$trackingId}[{$index}].{$fileExtension}");

                    // Store the file in the specified directory
                    $filePath = $attachment->storeAs(Proposal::getFileDirectory(), $fileName, 'public');

                    // Add the file path to the array
                    $files[$fileName] = $filePath;
                }

                // Create the proposal with the validated data
                $proposal = Proposal::create($validatedRequest);

                // Store each file as an attachment in the database
                foreach ($files as $fileName => $filePath) {
                    Attachment::create([
                        'proposalId' => $proposal->id,
                        'filePath' => $filePath,
                        'fileName' => $fileName
                    ]);
                }

                // Commit the transaction
                DB::commit();

                // Redirect after successful store
                return redirect()->route('receiver.dashboard');
            } catch (\Exception $e) {
                // If any exception occurs, rollback the transaction
                DB::rollBack();

                // Log the error for debugging purposes (optional)
                \Log::error("Proposal store failed: " . $e->getMessage());

                // Handle the error and show a user-friendly message
                return redirect()->back()->withInput()->withErrors(['attachments' => 'There was an error uploading the attachments.']);
            }
        }

        // Handle the case when no files are found
        return redirect()->back()->withInput()->withErrors(['attachments' => 'No attachments found.']);
    }

    public function create()
    {
        return inertia("Receiver/IncomingCreate");
    }
}
