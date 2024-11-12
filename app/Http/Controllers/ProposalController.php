<?php

namespace App\Http\Controllers;

use App\Models\Proposal;
use App\Http\Requests\Proposal\StoreProposalRequest;
use App\Http\Requests\Proposal\UpdateRequest;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProposalController extends Controller
{

    /**
     * Show the form for creating a new resource.
     */

/**
     * Store a newly created resource in storage.
     */

   

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Proposal $proposal)
    {
        $proposalData = $request->validated();
        if ($request->hasFile('attachment')) {
            $newAttachment = $request->file('attachment');
            // Delete the old file
            if ($proposal->attachment) {
                Storage::disk('public')->delete($proposal->attachment);
            }
            // Handle the new attachment
            $newAttachmentFileExtension = $newAttachment->getClientOriginalExtension();
            $newAttachmentFileName = str_replace(' ', '', "{$proposal->trackingId}.{$newAttachmentFileExtension}");

            // Store the new attachment
            $newAttachmentPath = $newAttachment->storeAs(Proposal::getFileDirectory(), $newAttachmentFileName);
            $proposalData['attachment'] = $newAttachmentPath; // Store the path directly
        } else {
            $proposalData['attachment'] = $proposal->attachment;
        }

        // Update the proposal with the new data
        $proposal->update($proposalData);
        return;
    }


}
