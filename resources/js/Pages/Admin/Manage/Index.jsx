import React from 'react'
import OfficeList from './Office/OfficeList'
import { Head, Link } from '@inertiajs/react'
import AdminLayout from '@/Layouts/AdminLayout'
import PrimaryButton from '@/Components/PrimaryButton'
export default function Index({ offices, users }) {
          console.log(users);

          return (
                    <AdminLayout>
                              <Head title="Manage" />
                              <div className="content-wrapper">
                                        <div className="section-wrapper">
                                                  <OfficeList offices={offices} />
                                        </div>
                                        <div className='section-wrapper'>
                                                  <header className='flex justify-between mb-2'>
                                                            <h3 className='section-header'>Users</h3>
                                                            <Link
                                                            href={route('admin.user.create')}
                                                            >
                                                                      <PrimaryButton>
                                                                                New
                                                                      </PrimaryButton>
                                                            </Link>
                                                  </header>
                                                  <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-2'>
                                                            {users.length > 0 ? users.map((user) => (
                                                                      <div key={user.id} className='border rounded-lg p-4'>
                                                                                <strong>{user.fullName}</strong>
                                                                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                                                                          {user.office?.officeName}
                                                                                </div>
                                                                      </div>
                                                            )) :
                                                                      <div>
                                                                                <h2 className='text-lg font-medium text-gray-900 dark:text-gray-400'>No User/s</h2>
                                                                      </div>
                                                            }
                                                  </div>
                                        </div>
                              </div>
                    </AdminLayout>
          )
}
