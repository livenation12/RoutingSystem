import AdminLayout from '@/Layouts/AdminLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

export default function Dashboard() {
          return (
                    <AdminLayout>
                              <Head title="Dashboard" />
                              <div className='content-wrapper grid md:grid-cols-5 gap-2'>
                                        <div className="section-wrapper">
                                                  
                                        </div>
                              </div>

                    </AdminLayout>
          )
}
