import Wrapper from '@/Components/Wrapper'
import AuthenticatedLayout from '@/Layouts/AdminLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import React from 'react'
import OfficeForm from './Partials/OfficeForm'
import SecondaryButton from '@/Components/SecondaryButton'
export default function OfficeEdit({ users, office }) {
          const { data, setData, post, processing, errors, isDirty } = useForm({
                    officeName: office.officeName,
                    officeHeadId: office.officeHeadId || '',
                    officialAlternateId: office.officialAlternateId || '',
          })
          
          return (
                    <AuthenticatedLayout
                              header={
                                        <div className='flex justify-between'>
                                                  <h2 className="main-header">Office</h2>
                                                  <Link href={route('admin.manage')}>
                                                            <SecondaryButton>Go back</SecondaryButton>
                                                  </Link>
                                        </div>
                              }>
                              <Head title="Office" />
                              <Wrapper>
                                        <header>
                                                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                                            Edit Office
                                                  </h2>
                                                  <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                            <p>Ensure your details is correct before submitting.</p>
                                                            <p>
                                                                      All of the fields with (<span className='text-red-500'>*</span>) are required.
                                                            </p>
                                                  </div>
                                        </header>
                                        <OfficeForm
                                                  type="edit"
                                                  noOfficeUsers={users}
                                                  data={data}
                                                  setData={setData}
                                                  post={post}
                                                  processing={processing}
                                                  errors={errors} 
                                                  isDirty={isDirty}
                                                  />
                              </Wrapper>
                    </AuthenticatedLayout>
          )
}
