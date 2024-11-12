<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ProposalResource extends JsonResource
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
            'sourceType' => $this->sourceType,
            'title' => $this->title,
            'description' => $this->description,
            'attachment' => Storage::url($this->attachment),
        ];
    }
}
