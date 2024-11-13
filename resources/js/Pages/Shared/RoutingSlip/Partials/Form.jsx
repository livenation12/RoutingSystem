import PrimaryButton from '@/Components/PrimaryButton';
import { FormInput, FormSelect, FormTextArea } from '@/Components/FormEntities';
import { actionRequestedTypes, actionTypes, urgencyTypes } from '@/fixed-options';
import { structOptions } from '@/helpers';

export default function Form({ onSubmit, errors, data, setData, processing, isDirty, offices }) {
          const handleChange = (e) => {
                    const { name, value } = e.target
                    setData((prev) => ({
                              ...prev,
                              [name]: value
                    }))
          }

          const structuredOffices = offices.map((office) => {
                    return {
                              label: office.officeName,
                              value: office.id
                    }
          })


          return (
                    <div className='grid lg:grid-cols-2 gap-5 w-full'>
                              <form onSubmit={onSubmit} className='space-y-6'>
                                        <input type="hidden" name="transactionId" value={data.transactionId} />
                                        <FormSelect
                                                  required
                                                  value={data.urgency}
                                                  name='urgency'
                                                  message={errors.urgency}
                                                  options={structOptions(urgencyTypes)}
                                                  errors={errors}
                                                  onChange={handleChange} />
                                        <FormTextArea
                                                  required
                                                  name='subject'
                                                  message={errors.subject}
                                                  value={data.subject}
                                                  onChange={handleChange} />
                                        <FormSelect
                                                  required
                                                  value={data.action}
                                                  name="action"
                                                  message={errors.action}
                                                  options={structOptions(actionTypes)}
                                                  onChange={handleChange}
                                                  hasOthersOption />
                                        <FormSelect
                                                  name="endorsedToOfficeId"
                                                  options={structuredOffices}
                                                  message={errors.endorsedToOfficeId}
                                                  onChange={handleChange}
                                                  labelValue='Endorse to Office' />
                                        <FormTextArea
                                                  name='remarks'
                                                  message={errors.remarks}
                                                  value={data.remarks}
                                                  onChange={handleChange} />
                                        <FormTextArea
                                                  labelValue='Additional Remarks'
                                                  name='additionalRemarks'
                                                  message={errors.additionalRemarks}
                                                  value={data.additionalRemarks}
                                                  onChange={handleChange} />
                                        <FormSelect
                                                  value={data.actionRequested}
                                                  labelValue='Action Requested'
                                                  name="actionRequested"
                                                  options={structOptions(actionRequestedTypes)}
                                                  message={errors.actionRequested}
                                                  onChange={handleChange}
                                                  hasOthersOption />
                                        <PrimaryButton
                                                  type="submit"
                                                  isLoading={processing}
                                                  disabled={!isDirty}
                                                  loadingText='Creating'
                                        >
                                                  Create
                                        </PrimaryButton>
                              </form>
                    </div >

          );
}
