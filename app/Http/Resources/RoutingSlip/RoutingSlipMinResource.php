<?php

namespace App\Http\Resources\RoutingSlip;

use App\Http\Resources\TransactionResource;
use App\Http\Resources\User\UserMinResource;
use App\Http\Resources\UserResource;
use Auth;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RoutingSlipMinResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        return [
            'id' => $this->id,
            'transactionId' => $this->transactionId,
            'transaction' => new TransactionResource($this->whenLoaded('transaction')),
            'docTin' => $this->docTin,
            'fromUser' => new UserMinResource($this->whenLoaded('fromUser')),
            'urgency' => $this->urgency,
            'toProcess' => Auth::user()->id === $this->fromUserId && !$this->endorsedToOfficeId && !$this->transaction->accomplishmentDate,
            'createdAt' => Carbon::parse($this->created_at)->diffForHumans(),
        ];
    }
}
