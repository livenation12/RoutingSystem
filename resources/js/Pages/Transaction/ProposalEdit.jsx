import Wrapper from '@/Components/Wrapper'
import AuthenticatedLayout from '@/Layouts/AdminLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import React from 'react'
import Form from '../Receiver/Partials/ProposalForm'
import { useToast } from '@/Components/Toast'
import SecondaryButton from '@/Components/SecondaryButton'
export default function ProposalEdit({ transaction }) {
          const toast = useToast();
          const proposal = transaction.proposal

          const { data, setData, put, errors, isDirty, processing } = useForm({
                    source: proposal.source,
                    sourceType: proposal.sourceType,
                    title: proposal.title,
                    description: proposal.description || '',
                    editAttachment: proposal.attachment,
                    attachment: null
          })

          const handleSubmit = (e) => {
                    e.preventDefault()
                    put(route('proposal.update', proposal.id), {
                              preserveScroll: true,
                              onSuccess: () => {
                                        toast('Updated', 'Proposal updated successfully')
                              }
                    })
          }
          return (
                    <AuthenticatedLayout
                              header={
                                        <div className='flex justify-between'>
                                                  <h2 className="main-header">
                                                            Transaction
                                                  </h2>
                                                  <Link href={route('transaction.index')}>
                                                            <SecondaryButton>Go back</SecondaryButton>
                                                  </Link>
                                        </ div>
                              }
                    >
                              <Head title='Proposal Edit' />
                              <Wrapper>

                                        <header className='mb-6'>
                                                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                                            Edit proposal
                                                  </h2>

                                                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                            Ensure your details is correct before submitting.
                                                  </p>
                                        </header>
                                        <Form
                                                  isDirty={isDirty}
                                                  data={data}
                                                  setData={setData}
                                                  errors={errors}
                                                  processing={processing}
                                                  onSubmit={handleSubmit}
                                        />
                              </Wrapper>
                    </AuthenticatedLayout>
          )
}
