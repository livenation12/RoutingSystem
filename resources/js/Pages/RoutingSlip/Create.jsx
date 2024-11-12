import Wrapper from '@/Components/Wrapper';
import AuthenticatedLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import React from 'react';
import { useToast } from '@/Components/Toast';
import { Link } from '@inertiajs/react';
import SecondaryButton from '@/Components/SecondaryButton';
import Form from './Partials/Form';
export default function Create({ transaction, offices }) {          
          const toast = useToast();
          const { data, setData, post, processing, errors, isDirty } = useForm({
                    transactionId: transaction.id,
                    urgency: '',
                    subject: '',
                    action: '',
                    endorsedToOfficeId: '',
                    status: '',
                    additionalRemarks: '',
                    actionRequested: '',
          });

          const handleSubmit = (e) => {
                    e.preventDefault();
                    post(route('routing-slip.store'), {
                              onSuccess: () => {
                                        toast('Created', 'Routing slip created successfully');
                              },
                    });
          };

          return (
                    <AuthenticatedLayout
                              header={
                                        <div className='flex justify-between'>
                                                  <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                                                            New Routing Slip
                                                  </h2>
                                                  <Link href={route('transaction.show', transaction.id)}>
                                                            <SecondaryButton>Go back</SecondaryButton>
                                                  </Link>
                                        </div>
                              }
                    >
                              <Head title="Create Routing Slip" />
                              <Wrapper>
                                        <header>
                                                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                                            Create Routing Slip
                                                  </h2>

                                                  <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                            <p>Ensure your details is correct before submitting.</p>
                                                            <p>
                                                                      All of the fields with (<span className='text-red-500'>*</span>) are required.
                                                            </p>
                                                  </div>
                                        </header>
                                        <Form
                                                  onSubmit={handleSubmit}
                                                  offices={offices}
                                                  setData={setData}
                                                  data={data}
                                                  processing={processing}
                                                  errors={errors}
                                                  isDirty={isDirty} />
                              </Wrapper>
                    </AuthenticatedLayout>
          );
}
