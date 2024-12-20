import { FormInput, FormSelect, FormTextArea } from '@/Components/FormEntities'
import PrimaryButton from '@/Components/PrimaryButton'
import React from 'react'

export default function RevertRoutingForm({ onSubmit, errors, setData, data, isDirty, processing, offices }) {

  const handleChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const structOptions = offices.map((office) => {
    return {
      label: office.officeName,
      value: office.id
    }
  })

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    // Update the form data with selected files
    setData((prev) => ({ ...prev, attachments: selectedFiles }));
  };

  return (
    <form onSubmit={onSubmit} className="max-w-xl space-y-6">
      <FormSelect
        labelValue='Office'
        onChange={handleChange}
        name={'officeId'}
        options={structOptions}
        message={errors.officeId}
      />
      <FormInput
        multiple
        onChange={handleFileChange}
        name='attachments'
        type="file"
        message={errors.attachments}
      />
      <FormTextArea
        value={data.remarks}
        labelValue='Remarks'
        name='remarks'
        onChange={handleChange}
        message={errors.remarks}
      />
      <FormTextArea
        value={data.additionalRemarks}
        labelValue='Additional Remarks'
        name='additionalRemarks'
        onChange={handleChange}
        message={errors.additionalRemarks}
      />
      <PrimaryButton
        disabled={!isDirty || processing}
        type='submit'
        isLoading={processing}
      >
        Revert
      </PrimaryButton>
    </form>
  )
}
