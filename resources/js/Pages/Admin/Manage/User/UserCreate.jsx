import AdminLayout from '@/Layouts/AdminLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import React from 'react'
import UserForm from './Partials/UserForm'
import SecondaryButton from '@/Components/SecondaryButton'
import { useToast } from '@/Components/Toast'
export default function UserCreate({ roles }) {
    const toast = useToast()
    const { post, errors, data, setData, processing, isDirty } = useForm({
        firstName: '',
        lastName: '',
        password: '',
        password_confirmation: '',
        role: '',
        email: ''
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        post(route('admin.user.store'), {
            onSuccess: () => {
                toast('Added', 'User added successfully')
            }
        }
        )
    }

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
                    <UserForm
                        roles={roles}
                        onSubmit={handleSubmit}
                        errors={errors}
                        data={data}
                        setData={setData}
                        processing={processing}
                        isDirty={isDirty}
                    />
                </section>
            </div>
        </AdminLayout>
    )
}
