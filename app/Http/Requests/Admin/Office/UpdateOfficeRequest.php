<?php

namespace App\Http\Requests\Admin\Office;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateOfficeRequest extends FormRequest
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
        $office = $this->route('office'); // Assuming you're passing the office as a route parameter

        return [
            'officeName' => ['required'],
            'officeHeadId' => ['required', 'exists:users,id', 'different:officialAlternateId'],
            'officialAlternateId' => ['nullable', 'exists:users,id', 'different:officialHeadId'],
            'abbr' => ['required', Rule::unique('offices', 'abbr')->ignore($office->id)],
        ];
    }

    public function messages()
    {
        return [
            'officeHeadId.required' => 'Office Head is required.',
            'officialAlternateId.exists' => 'The selected official alternate is invalid.',
            'officialAlternateId.different' => 'The official alternate cannot be the same as the office head.',
        ];
    }
}
