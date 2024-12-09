<?php

namespace App\Http\Resources\Transaction;

use App\Http\Resources\ProposalResource;
use App\Http\Resources\RoutingSlipResource;
use App\Http\Resources\UserResource;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;


class TransactionResource extends JsonResource
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
            'receivedBy' => new UserResource($this->receiver),
            'accomplishmentDate' => !empty($this->accomplishmentDate)
                ? Carbon::parse($this->accomplishmentDate)->format('Y-m-d H:i:s')
                : 'Not yet accomplished',
            'status' => !empty($this->accomplishmentDate)
                ? 'Completed'
                : 'On going',
            'proposal' => new ProposalResource($this->whenLoaded('proposal')),
            'created_at' => Carbon::parse($this->created_at)->diffForHumans(),
            'updated_at' => Carbon::parse($this->updated_at)->diffForHumans(),
            'routingSlips' => RoutingSlipResource::collection($this->whenLoaded('routingSlips')),
            'isInitialized' => $this->routingSlips && $this->routingSlips->isNotEmpty(),
        ];
    }
}
