import React from 'react'
import { Link } from '@inertiajs/react'
import PrimaryButton from '@/Components/PrimaryButton'

export default function UserList({ users }) {

    return (
        <div>
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
                        <h2 className='text-lg font-medium text-gray-900 dark:text-gray-400'>No Users</h2>
                    </div>
                }
            </div>
        </div>
    )
}
