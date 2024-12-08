<?php

namespace App\Http\Requests\Receiver;

use Illuminate\Foundation\Http\FormRequest;

class InitializeRoutingSlipRequest extends FormRequest
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
            'urgency' => ['required'],
            'subject' => ['required'],
            'action' => ['nullable'],
            'actionRequested' => ['nullable'],
        
        ];
    }
}
