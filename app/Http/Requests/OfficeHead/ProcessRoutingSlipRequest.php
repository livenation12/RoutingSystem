<?php

namespace App\Http\Requests\OfficeHead;

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
            'urgency' => ['required', 'string'],
            'subject' => ['required'],
            'endorsedToOfficeId' => ['nullable', 'exists:offices,id'],
            'remarks' => ['required_if:endorsedToOfficeId,!=,"', 'required_if:endorsedToOfficeId,!=,'],
            'additionalRemarks' => ['nullable'],
            'action' => ['nullable'],
            'actionRequested' => ['nullable']
        ];
    }
}
