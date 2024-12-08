<?php

namespace App\Http\Requests\Receiver;

use Illuminate\Foundation\Http\FormRequest;

class StoreAttachmentRequest extends FormRequest
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
            'attachments' => ['required', 'array'],  // Ensure it's an array of files
            'attachments.*' => ['image', 'mimes:jpeg,png,jpg,gif,svg', 'max:10240'],  // Max file size = 10MB
        ];
    }
}
