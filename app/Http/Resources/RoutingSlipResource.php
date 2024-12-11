<?php

namespace App\Http\Resources;

use App\Http\Resources\Transaction\TransactionResource;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Auth;
class RoutingSlipResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        RemarksResource::withoutWrapping();
        return [
            'id' => $this->id,
            'docTin' => $this->docTin,
            'fromUser' => new UserResource($this->whenLoaded('fromUser')),
            'urgency' => $this->urgency,
            'subject' => $this->subject,
            'action' => $this->action,
            'endorsedTo' => new OfficeResource($this->endorsedTo) ?? '--',
            'status' => $this->status,
            'additionalRemarks' => $this->additionalRemarks,
            'remarks' => RemarksResource::collection($this->remarks),
            'actionRequested' => $this->actionRequested,
            'transaction' => new TransactionResource($this->whenLoaded('transaction')),
            'created_at' => Carbon::parse($this->created_at)->diffForHumans(),
            'toProcess' => Auth::user()->id === $this->fromUserId && !$this->endorsedToOfficeId && !$this->transaction->accomplishmentDate,
        ];
    }
}
