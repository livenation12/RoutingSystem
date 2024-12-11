import { FormTextArea } from '@/Components/FormEntities'
import PrimaryButton from '@/Components/PrimaryButton'
import React from 'react'

export default function RevertRoutingForm({ onSubmit, errors, setData, data, isDirty, processing }) {

  const handleChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  return (
    <form onSubmit={onSubmit} className="max-w-xl space-y-6">
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
        disabled={isDirty || processing}
        type='submit'
        isLoading={processing}
      >
        Revert
      </PrimaryButton>
    </form>
  )
}
