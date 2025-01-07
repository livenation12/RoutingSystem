import React, { useState } from 'react'
import { Link } from '@inertiajs/react'
import PrimaryButton from '@/Components/PrimaryButton'
import SecondaryButton from '@/Components/SecondaryButton'
import UpdateRoleModal from './Partials/UpdateRoleModal';


export default function UserList({ users, roles }) {
    const [userShow, setUserShow] = useState({
        modal: false,
        user: null
    });
    const handleUpdateRoleClick = (user) => {
        setUserShow({
            modal: true,
            user
        });
    }
    const handleUpdateRoleClose = () => {
        setUserShow((prev) => ({
            ...prev,
            modal: false,
        }));
    }
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
                    <div key={user.id} className='border rounded-lg p-4 relative text-sm text-gray-600 dark:text-gray-400'>
                        <SecondaryButton
                            onClick={() => handleUpdateRoleClick(user)}
                            className='absolute top-3 right-3'>
                            Update Role
                        </SecondaryButton>

                        <strong className='main-text'>{user.fullName}</strong>
                        <div>
                            {user.office?.officeName}
                        </div>
                        <div className='inline-flex gap-1.5'>
                            <span className='font-bold text-gray-900 dark:text-gray-300'>Roles</span>
                            <span>[ {user.joinedRoles} ]</span>
                        </div>
                    </div>
                )) :
                    <div>
                        <h2 className='text-lg font-medium text-gray-900 dark:text-gray-400'>No Users</h2>
                    </div>
                }
            </div>
            <UpdateRoleModal roles={roles} userShow={userShow} handleUpdateRoleClose={handleUpdateRoleClose} />
        </div>
    )
}
