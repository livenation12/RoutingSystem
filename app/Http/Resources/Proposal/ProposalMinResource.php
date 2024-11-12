<?php

namespace App\Http\Resources\Proposal;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProposalMinResource extends JsonResource
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
            'trackingId' => $this->trackingId,
            'source' => $this->source,
            'title' => $this->title,
        ];
    }
}
