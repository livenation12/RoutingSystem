import AdminLayout from '@/Layouts/AdminLayout'
import { Head, Link } from '@inertiajs/react'
import React from 'react'
import UserForm from './Partials/UserForm'
import SecondaryButton from '@/Components/SecondaryButton'

export default function UserCreate() {
          return (
                    <AdminLayout header={
                              <div className='flex justify-between'>
                                        <h1 className='main-header'>Create User</h1>
                                        <Link href={route('admin.manage')}>
                                                  <SecondaryButton>Go back</SecondaryButton>
                                        </Link>
                              </div>

                    }>
                              <Head title='Create User' />
                              <div className="content-wrapper">
                                        <section className="section-wrapper">
                                                  <header>
                                                            <div></div>
                                                            <h2 className="section-header">User Form</h2>
                                                            <p className='text-sm text-gray-500'>Please fill out the form below</p>
                                                  </header>
                                                  <UserForm />
                                        </section>
                              </div>
                    </AdminLayout>
          )
}
