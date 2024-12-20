<?php

namespace App\Http\Controllers\OfficeHead\Routing;

use App\Http\Controllers\Controller;
use App\Http\Requests\RevertRoutingRequest;
use App\Models\Attachment;
use App\Models\Office;
use App\Models\Remarks;
use App\Models\RoutingSlip;
use DB;

class RevertRoutingController extends Controller
{

    public function form(RoutingSlip $routingSlip)
    {
        return inertia('OfficeHead/RevertRouting', [
            'routingSlip' => $routingSlip,
            'offices' => Office::all()
        ]);
    }


    public function revert(RevertRoutingRequest $request, RoutingSlip $routingSlip)
    {
        $validated = $request->validated();
        DB::beginTransaction();
        try {
            if ($request->hasFile('attachments')) {
                $existingFiles = Attachment::where('proposalId', $routingSlip->transaction->proposal->id)
                    ->pluck('fileName')
                    ->toArray();

                foreach ($request->file(key: 'attachments') as $key => $attachment) {

                    $fileExtension = $attachment->getClientOriginalExtension();

                    $fileName = str_replace(' ', '', "{$routingSlip->docTin}[$key].$fileExtension");

                    while (in_array($fileName, $existingFiles)) {
                        $index++;  // Increment the index to make the file name unique
                        $fileName = str_replace(' ', '', "{$routingSlip->docTin}[{$index}].{$fileExtension}");  // Generate the new unique filename
                    }

                    $filePath = $attachment->storeAs($routingSlip::getFileDirectory(), $fileName, 'public');

                    $routingSlip->attachments()->create([
                        'fileName' => $fileName,
                        'filePath' => $filePath
                    ]);
                }
            }
            if (!empty($validated['additionalRemarks'])) {
                $routingSlip->additionalRemarks = $validated['additionalRemarks'];
                $routingSlip->save();
            }
            Remarks::create([
                "message" => $validated['remarks'],
                "routingSlipId" => $routingSlip->id,
                'office' => $validated['office']
            ]);
            if ($routingSlip->transaction) {
                $routingSlip->transaction->accomplishmentDate = now();
                $routingSlip->transaction->save();
            }
            $routingSlip->endorsedToOfficeId = $validated['officeId'];
            $routingSlip->save();
            DB::commit();
        } catch (\ErrorException $e) {
            DB::rollBack();
            \Log::error("Error occured while reverting routing slip: " . $e->getMessage());
        }
    }
}
