import { FormSelect, FormTextArea } from '@/Components/FormEntities'
import PrimaryButton from '@/Components/PrimaryButton'
import React, { useState } from 'react'

const processTypes = [
  { value: 'endorse', label: 'Endorse' },
  { value: 'accomplish', label: 'Accomplish' },
]
export default function ProcessRoutingSlipForm({ officesToEndorsedTo, onSubmit, errors, setData, data, isDirty, processing }) {
  const [processType, setProcessType] = useState(processTypes[1].value)
  const structureEndorsedTo = officesToEndorsedTo.map((office) => ({ value: office.id, label: office.officeName }));
  const handleProcessTypeChange = (e) => {
    setProcessType(e.target.value)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  return (
    <form className='max-w-xl space-y-6' onSubmit={onSubmit}>
      <FormSelect
        onChange={handleProcessTypeChange}
        name={'processType'}
        value={processType}
        labelValue='Process Type'
        options={processTypes} />
      {processType === processTypes[0].value ? //if the type is not accomplish
        <FormSelect
          onChange={handleChange}
          name={'endorsedToOfficeId'}
          value={data.endorsedToOfficeId}
          labelValue='Endorsed To'
          options={structureEndorsedTo} /> : null
      }
      <FormTextArea
        required
        name='remarks'
        value={data.remarks}
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
        type='submit'
        disabled={!isDirty}
        isLoading={processing}>Process</PrimaryButton>
    </form>
  )
}
