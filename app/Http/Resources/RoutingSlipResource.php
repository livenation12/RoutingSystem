<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

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
            'endorsedTo' => new OfficeResource($this->endorsedTo),
            'status' => $this->status,
            'additionalReamarks' => $this->additionalRemarks,
            'remarks' => RemarksResource::collection($this->remarks),
            'actionRequested' => $this->actionRequested,
            'transaction' => new TransactionResource($this->whenLoaded('transaction'))
        ];
    }
}
