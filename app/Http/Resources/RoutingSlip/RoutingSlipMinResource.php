<?php

namespace App\Http\Resources\RoutingSlip;

use App\Http\Resources\User\UserMinResource;
use App\Http\Resources\UserResource;
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
            'docTin' => $this->docTin,
            'fromUser' => new UserMinResource($this->fromUser),
            'urgency' => $this->urgency,
        ];
    }
}
