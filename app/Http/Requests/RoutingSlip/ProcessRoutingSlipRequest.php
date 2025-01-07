<?php

namespace App\Http\Requests\RoutingSlip;

use Illuminate\Foundation\Http\FormRequest;

class ProcessRoutingSlipRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'endorsedToOfficeId' => ['nullable', 'string'],
            'additionalRemarks' => ['nullable', 'string'],
            'remarks' => ['required', 'string'],
        ];
    }
}
