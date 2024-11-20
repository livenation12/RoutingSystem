<?php

namespace App\Http\Requests\RoutingSlip;

use Illuminate\Foundation\Http\FormRequest;

class StoreRoutingSlipRequest extends FormRequest
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
            'transactionId' => ['required', 'max:255', 'numeric', 'exists:transactions,id'],
            'urgency' => ['required', 'string', 'max:255'],
            'subject' => ['required', 'string', 'max:255'],
            'action' => ['required', 'string', 'max:255'],
            'endorsedToOfficeId' => ['nullable', 'string', 'exists:offices,id'],
            'remarks' => ['required_if:endorsedToOfficeId,!=,"', 'required_if:endorsedToOfficeId,!=,'],
            'status' => ['nullable', 'string'],
            'additionalRemarks' => ['nullable', 'string', 'max:255'],
            'actionRequested' => ['nullable', 'string', 'max:255'],
        ];
    }
}
