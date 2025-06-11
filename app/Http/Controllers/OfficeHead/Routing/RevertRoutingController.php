<?php

namespace App\Http\Controllers\OfficeHead\Routing;

use App\Http\Controllers\Controller;
use App\Http\Requests\RevertRoutingRequest;
use App\Models\Attachment;
use App\Models\Office;
use App\Models\Remarks;
use App\Models\RoutingLog;
use App\Models\RoutingSlip;
use App\Models\User;
use App\Notifications\UserActionNotification;
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
                $existingFiles = Attachment::where('routingId', $routingSlip->id)
                    ->pluck('fileName')
                    ->toArray();
                foreach ($request->file('attachments') as $key => $attachment) {

                    $fileExtension = $attachment->getClientOriginalExtension();

                    $fileName = str_replace(' ', '', "{$routingSlip->docTin}[$key].$fileExtension");

                    while (in_array($fileName, $existingFiles)) {
                        $key++;  // Increment the key to make the file name unique
                        $fileName = str_replace(' ', '', "{$routingSlip->docTin}[{$key}].{$fileExtension}");  // Generate the new unique filename
                    }

                    $filePath = $attachment->storeAs($routingSlip::getFileDirectory(), $fileName, 'public');

                    $attachment =  Attachment::create([
                        'fileName' => $fileName,
                        'filePath' => $filePath,
                        'routingId' => $routingSlip->id
                    ]);
                    \Log::info('Attachment Created: ', $attachment->toArray());
                }
            }

            if (!empty($validated['additionalRemarks'])) {
                $routingSlip->additionalRemarks = $validated['additionalRemarks'];
                $routingSlip->save();
            }

            Remarks::create([
                "message" => $validated['remarks'],
                "routingSlipId" => $routingSlip->id,
                'office' => $routingSlip->endorsedBy->officeName
            ]);

            if ($routingSlip->transaction) {
                $routingSlip->transaction->accomplishmentDate = now();
                $routingSlip->transaction->save();
            }
            $routingSlip->update([
                "endorsedToOfficeId" => $routingSlip->endorsedByOfficeId,
                "status" => 'Reverted'
            ]);
            RoutingLog::create([
                'routingSlipId' => $routingSlip->id,
                'status' => 'Reverted',
            ]);
            User::getDepartmentHead()->notify(new UserActionNotification("Routing Slip #{$routingSlip->docTin} has been reverted"));
            DB::commit();
            return to_route('office-head.dashboard', ['routingSlip' => $routingSlip]);
        } catch (\ErrorException $e) {
            DB::rollBack();
            \Log::error("Error occured while reverting routing slip: " . $e->getMessage());
        }
    }
}
