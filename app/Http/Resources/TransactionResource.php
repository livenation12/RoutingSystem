<?php

namespace App\Http\Resources;

use App\Http\Resources\Proposal\ProposalMinResource;
use App\Http\Resources\RoutingSlip\RoutingSlipMinResource;
use App\Http\Resources\User\UserMinResource;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Routing\Events\Routing;

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
            'receivedBy' => new UserMinResource($this->receiver),
            'accomplishmentDate' => !empty($this->accomplishmentDate) ? Carbon::parse($this->accomplishmentDate)->format('Y-m-d H:i:s') : 'Not yet accomplished',
            'status' => !empty($this->accomplishmentDate) ? 'Completed' : 'On going',
            'proposal' => new ProposalResource($this->whenLoaded('proposal')),
            'created_at' => Carbon::parse($this->created_at)->diffForHumans(),
            'updated_at' => Carbon::parse($this->updated_at)->diffForHumans(),
            'routingSlips' => RoutingSlipMinResource::collection($this->whenLoaded('routingSlips')),
        ];
    }
}
