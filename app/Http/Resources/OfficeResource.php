<?php

namespace App\Http\Resources;

use App\Http\Resources\User\UserMinResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OfficeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        UserMinResource::withoutWrapping();
        return [
            'id' => $this->id,
            'officeName' => $this->officeName,
            'officeHead' => $this->officeHead ? new UserMinResource($this->officeHead) : null,
            'officialAlternate' => $this->officialAlternate ? new UserMinResource($this->officialAlternate) : null,
        ];
    }
}
