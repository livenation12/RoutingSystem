import React from 'react'
import Modal from '@/Components/Modal';
import { X } from 'lucide-react';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import { FormSelect } from '@/Components/FormEntities';
import { useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function UpdateRoleModal({ roles, handleUpdateRoleClose, userShow }) {
          const { data, setData, post, processing, errors, isDirty } = useForm({
                    role: '',
          })
          const structRoles = roles.map(role => {
                    return {
                              label: role.name,
                              value: role.name
                    }
          })

          const handleAddRole = (e) => {
                    e.preventDefault()
                    post(route('admin.user.assign', userShow.user.id), {
                              onSuccess: () => {
                                        toast('Added', 'Role added successfully')
                              },
                              preserveScroll: true
                    })
          }
          return (
                    <Modal show={userShow.modal} onClose={handleUpdateRoleClose}>
                              <div className='p-5 relative'>
                                        <header className='mb-3'>
                                                  <h4 className='text-gray-200 text-lg font-semibold'>Update Role</h4>
                                        </header>
                                        <SecondaryButton className='absolute top-3 right-3' onClick={handleUpdateRoleClose}><X /></SecondaryButton>
                                        <div className='my-2'>

                                                  <div className='font-semibold text-gray-900 dark:text-gray-300'>
                                                            <p>{userShow.user?.fullName}</p>
                                                  </div>

                                        </div>
                                        <form className='mb-2 space-y-2 flex flex-col' onSubmit={handleAddRole}>
                                                  <FormSelect
                                                            name='role'
                                                            value={data.role}
                                                            onChange={(e) => setData('role', e.target.value)}
                                                            message={errors.role}
                                                            options={structRoles}
                                                  />
                                                  <PrimaryButton
                                                            type='submit'
                                                            className='ml-auto'>
                                                            Add role
                                                  </PrimaryButton>
                                        </form>
                                        <div className='border rounded'>
                                                  <table className='styled'>
                                                            <thead>
                                                                      <tr>
                                                                                <th className='text-gray-900 dark:text-gray-300 text-start py-2 px-3'>
                                                                                          User Role List
                                                                                </th>
                                                                      </tr>
                                                            </thead>
                                                            <tbody className='text-gray-900 dark:text-gray-400'>
                                                                      {userShow.user?.roles.map((role, index) => (
                                                                                <tr key={index} className='hover:bg-gray-700'>
                                                                                          <td className='flex items-center justify-between py-2 px-3'>
                                                                                                    {role}
                                                                                                    <DangerButton><X className='me-1.5' /> Remove Role</DangerButton>
                                                                                          </td>
                                                                                </tr>
                                                                      ))}
                                                            </tbody>
                                                  </table>
                                        </div>
                              </div>
                    </Modal >
          )
}
