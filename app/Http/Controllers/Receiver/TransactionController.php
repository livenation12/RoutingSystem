<?php

namespace App\Http\Controllers\Receiver;

use App\Http\Controllers\Controller;
use App\Http\Requests\Receiver\RemoveAttachmentRequest;
use App\Http\Requests\Receiver\StoreAttachmentRequest;
use App\Http\Requests\Receiver\UpdateTransactionRequest;
use App\Http\Resources\Transaction\TransactionResource;
use App\Models\Attachment;
use App\Models\Proposal;
use App\Models\Transaction;
use DB;
use Illuminate\Support\Facades\Storage;

class TransactionController extends Controller
{
    public function edit(Transaction $transaction)
    {
        // Disable resource wrapping globally if needed
        TransactionResource::withoutWrapping();

        // Load the 'proposal' relationship (if not already loaded)
        $transaction = $transaction->load('proposal');

        // Return the resource wrapped in Inertia
        return inertia('Receiver/TransactionEdit', [
            'transaction' => new TransactionResource($transaction),
        ]);
    }

    public function update(UpdateTransactionRequest $request, Transaction $transaction)
    {
        $validated = $request->validated();
        $proposal = Proposal::find($transaction->proposal->id);
        $proposal->update($validated);
        return redirect()->route('receiver.transaction.edit', ['transaction' => $transaction->id]);
    }

    public function removeAttachments(RemoveAttachmentRequest $request, Transaction $transaction)
    {
        $validated = $request->validated();
        DB::beginTransaction();
        try {
            // Loop through each attachment ID and delete the attachment and its file
            foreach ($validated['attachmentIds'] as $attachmentId) {
                $attachment = Attachment::find($attachmentId);

                if ($attachment) {
                    // First, delete the file from storage
                    if (Storage::exists($attachment->filePath)) {
                        Storage::delete($attachment->filePath); // This will delete the file
                    }

                    // Now delete the attachment record from the database
                    $attachment->delete();
                }
            }

            // Commit the transaction if everything goes well
            DB::commit();
        } catch (\Exception $e) {
            // Rollback the transaction in case of an error
            DB::rollBack();

            // Optionally, log the error
            \Log::error('Error removing attachments: ' . $e->getMessage());
        }

        return redirect()->route('receiver.transaction.edit', ['transaction' => $transaction->id]);
    }

    public function storeAttachments(StoreAttachmentRequest $request, Transaction $transaction)
    {
        // Validate incoming request data
        $request->validated();

        // Get the tracking ID from the transaction
        $trackingId = $transaction->proposal->trackingId;

        // Get the last attachment count (index) from existing files
        $getLastAttachmentCount = (int) Attachment::where('proposalId', $transaction->proposal->id)
            ->pluck('fileName')
            ->map(function ($filename) {
                // Match numbers inside square brackets (e.g., [0], [1], [2], etc.)
                preg_match('/\[(\d+)\]/', $filename, $matches);
                return $matches[1] ?? null;
            })
            ->max();

        DB::beginTransaction();

        try {
            // Check if there are files in the request
            if ($request->hasFile('attachments')) {
                // Get all existing file names in the proposal to avoid duplicates
                $existingFiles = Attachment::where('proposalId', $transaction->proposal->id)
                    ->pluck('fileName')
                    ->toArray();

                // Loop through each file in the request
                foreach ($request->file('attachments') as $index => $attachment) {
                    // Add the starting index to the iteration index
                    $index += $getLastAttachmentCount + 1;

                    // Get the file extension
                    $fileExtension = $attachment->getClientOriginalExtension();

                    // Create the filename using tracking ID and index
                    $fileName = str_replace(' ', '', "{$trackingId}[{$index}].{$fileExtension}");

                    // Check if the file already exists in the list of existing files
                    if (in_array($fileName, $existingFiles)) {
                        // If the file already exists, skip it
                        continue;
                    }

                    // Store the new file (assuming you want to save it to storage)
                    $filePath = $attachment->storeAs(Proposal::getFileDirectory(), $fileName, 'public');

                    // If you have a model that stores the filenames in the database, you can do it here
                    $transaction->proposal->attachments()->create([
                        'fileName' => $fileName,
                        'filePath' => $filePath, // Or adjust according to how you store the file paths
                    ]);
                }
                DB::commit();
            }
        } catch (\Exception $e) {
            // Rollback the transaction in case of an error
            DB::rollBack();

            // Optionally, log the error
            \Log::error('Error removing attachments: ' . $e->getMessage());
        }

        return redirect()->route('receiver.transaction.edit', ['transaction' => $transaction->id]);
    }
}
