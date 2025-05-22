import React from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import { FormInput, FormSelect, FormTextArea } from '@/Components/FormEntities';
import { structOptions } from '@/helpers';
import { sourceTypes } from '@/fixed-options';
export default function ProposalForm({ onSubmit, errors, data, setData, processing, isDirty }) {

     const handleFileChange = (event) => {
          const selectedFiles = event.target.files;
          // Update the form data with selected files
          setData((prev) => ({ ...prev, attachments: selectedFiles }));
     };

     const handleInputChange = (event) => {
          const { name, value } = event.target;
          setData((prev) => ({
               ...prev,
               [name]: value
          }));
     }


     return (
          <div className='grid lg:grid-cols-2 gap-5'>
               <form onSubmit={onSubmit} className='space-y-6'>
                    <FormInput
                         message={errors.title}
                         value={data.title}
                         name='title'
                         labelValue='Title'
                         onChange={handleInputChange}
                    />

                    <FormInput
                         message={errors.source}
                         value={data.source}
                         name='source'
                         labelValue='Source'
                         onChange={handleInputChange}
                    />
                    <FormSelect
                         options={structOptions(sourceTypes)}
                         message={errors.sourceType}
                         value={data.sourceType}
                         name='sourceType'
                         labelValue='Source Type'
                         onChange={handleInputChange}
                    />
                    <FormInput
                         labelValue={data.editAttachment ? 'Change Attachment' : 'Attachment'}
                         message={
                              Object.keys(errors).some(key => key.startsWith('attachments.')) && (
                                   <div className="text-red-500">Attachments should not be greater than 2MB.</div>
                              )
                         }
                         type='file'
                         multiple
                         name="attachments"
                         onChange={handleFileChange}
                    />
                    <FormTextArea
                         name="description"
                         value={data.description}
                         onChange={handleInputChange}
                    />
                    <PrimaryButton type="submit" isLoading={processing} disabled={!isDirty} loadingText='Submitting'>Submit</PrimaryButton>
               </form>
               {data.editAttachment && (
                    <img src={data.editAttachment} className='h-full object-cover' alt={data.editAttachment} />
               )}
          </div>
     );
}
