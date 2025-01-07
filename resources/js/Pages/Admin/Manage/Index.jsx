import React from 'react'
import OfficeList from './Partials/OfficeList'
import { Head } from '@inertiajs/react'
import AdminLayout from '@/Layouts/AdminLayout'
import UserList from './Partials/UserList'
export default function Index({ offices, users, roles }) {
    return (
        <AdminLayout>
            <Head title="Manage" />
            <div className="content-wrapper">
                <div className="section-wrapper">
                    <OfficeList offices={offices} />
                </div>
                <div className='section-wrapper'>
                    <UserList roles={roles} users={users} />
                </div>
            </div>
        </AdminLayout> 
    )
}
