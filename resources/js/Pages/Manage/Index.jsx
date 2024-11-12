import React from 'react'
import OfficeList from './Office/OfficeList'
import AuthenticatedLayout from '@/Layouts/AdminLayout'
import { Head } from '@inertiajs/react'
export default function Index({ offices }) {
          return (
                    <AuthenticatedLayout header={
                              <h2 className="main-header">Manage</h2>
                    }>
                              <Head title="Manage" />
                              <div className="content-wrapper">
                                        <div className='grid lg:grid-cols-3 gap-2'>
                                                  <div className='lg:col-span-2'>
                                                            <OfficeList offices={offices} />
                                                  </div>
                                        </div>
                              </div>
                    </AuthenticatedLayout>
          )
}
