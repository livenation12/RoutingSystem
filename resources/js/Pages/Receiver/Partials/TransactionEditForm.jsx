import { FormInput, FormTextArea } from '@/Components/FormEntities'
import PrimaryButton from '@/Components/PrimaryButton'
import React from 'react'

export default function TransactionEditForm({ onSubmit, errors, data, setData, processing, isDirty }) {
          const handleChange = (e) => {
                    const { name, value } = e.target
                    setData((prev) => ({
                              ...prev,
                              [name]: value
                    }))
          }
          return (
                    <div className='grid grid-cols-2 gap-2'>
                              <form onSubmit={onSubmit} className="max-w-xl space-y-5">
                                        <FormInput
                                                  message={errors.title}
                                                  required
                                                  name='title'
                                                  value={data.title}
                                                  onChange={handleChange}
                                        />
                                        <FormInput
                                                  message={errors.source}
                                                  required
                                                  name='source'
                                                  value={data.source}
                                                  onChange={handleChange}
                                        />
                                        <FormTextArea
                                                  message={errors.description}
                                                  name='description'
                                                  value={data.description}
                                                  onChange={handleChange}
                                        />
                                        <PrimaryButton
                                                  disabled={!isDirty}
                                                  isLoading={processing}
                                        >
                                                  Update
                                        </PrimaryButton>
                              </form>
                    </div>
          )
}
