<?php

namespace App\Http\Requests\Office;

use Illuminate\Foundation\Http\FormRequest;

class StoreOfficeRequest extends FormRequest
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
            'officeName' => ['required', 'string', 'max:255'],
            'officeHeadId' => ['required', 'numeric', 'max:255', 'exists:users,id'],
            'officialAlternateId' => ['nullable', 'numeric', 'max:255', 'exists:users,id'],
        ];
    }

    public function messages()
    {
        return [
            'officeHeadId.required' => 'Office Head is required.',
            'officialAlternateId.exists' => 'The selected official alternate is invalid.',
        ];
    }
}
