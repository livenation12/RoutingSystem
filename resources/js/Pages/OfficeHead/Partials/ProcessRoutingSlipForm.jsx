import { FormSelect, FormTextArea } from '@/Components/FormEntities'
import PrimaryButton from '@/Components/PrimaryButton'
import { actionRequestedTypes, actionTypes, urgencyTypes } from '@/fixed-options'
import { structOptions } from '@/helpers'
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
        onChange={handleChange}
        name={'urgency'}
        value={data.urgency}
        options={structOptions(urgencyTypes)} />
      <FormTextArea
        required
        name='subject'
        value={data.subject}
        onChange={handleChange}
        message={errors.subject} />
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
      <FormSelect
        onChange={handleChange}
        name={'action'}
        value={data.action}
        options={structOptions(actionTypes)} />
      <FormSelect
        labelValue='Action Requested'
        onChange={handleChange}
        name={'actionRequested'}
        value={data.actionRequested}
        options={structOptions(actionRequestedTypes)} />
      <PrimaryButton
        type='submit'
        disabled={!isDirty}
        isLoading={processing}>Process</PrimaryButton>
    </form>
  )
}
