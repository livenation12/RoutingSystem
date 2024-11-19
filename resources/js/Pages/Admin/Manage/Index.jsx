import React from 'react'
import OfficeList from './Office/OfficeList'
import { Head, Link } from '@inertiajs/react'
import AdminLayout from '@/Layouts/AdminLayout'
import UserList from './User/Partials/UserList'
export default function Index({ offices, users }) {
    return (
        <AdminLayout>
            <Head title="Manage" />
            <div className="content-wrapper">
                <div className="section-wrapper">
                    <OfficeList offices={offices} />
                </div>
                <div className='section-wrapper'>
                    <UserList users={users} />
                </div>
            </div>
        </AdminLayout>
    )
}
