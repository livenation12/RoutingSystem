<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request)
    {

        return [
            'id' => $this->id,
            'fullName' => $this->firstName . ' ' . $this->lastName,
            'firstName' => $this->firstName,
            'lastName' => $this->lastName,
            'office' => new OfficeResource($this->whenLoaded('office')),
            'email' => $this->email,
            'created_at' => Carbon::parse($this->created_at)->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::parse($this->updated_at)->format('Y-m-d H:i:s'),
            'roles' => $this->whenLoaded('roles', $this->roles->pluck('name')),
            'joinedRoles' => $this->whenLoaded('roles', rtrim(implode(', ', ($this->roles->pluck('name')->toArray())), ', ')),
        ];
    }
}
