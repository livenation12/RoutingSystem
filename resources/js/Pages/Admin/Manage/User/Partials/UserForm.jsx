import { FormInput, FormSelect } from '@/Components/FormEntities'
import PrimaryButton from '@/Components/PrimaryButton'
import React from 'react'

export default function UserForm({ onSubmit, errors, data, setData, processing, isDirty, roles }) {
    const handleChange = (e) => {
        const { name, value } = e.target
        setData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const structRoles = roles.map(role => {
        return {
            label: role.name,
            value: role.name
        }
    })
    return (
        <form onSubmit={onSubmit} className='max-w-xl space-y-6 mt-5'>
            <FormInput
                message={errors.firstName}
                value={data.firstName}
                name='firstName'
                labelValue='First Name'
                onChange={handleChange}
            />
            <FormInput
                value={data.lastName}
                name='lastName'
                labelValue='Last Name'
                onChange={handleChange}
                message={errors.lastName}

            />
            <FormInput
                value={data.email}
                name='email'
                labelValue='Email'
                type='email'
                onChange={handleChange}
                message={errors.email}
            />
            <FormSelect
                options={structRoles}
                value={data.role}
                name='role'
                labelValue='Role'
                onChange={handleChange}
                message={errors.role}
            />
            <FormInput
                value={data.password}
                name='password'
                labelValue='Password'
                type='password'
                onChange={handleChange}
                message={errors.password}

            />
            <FormInput
                value={data.passsword_confirmation}
                name='password_confirmation'
                labelValue='Confirm Password'
                type='password'
                onChange={handleChange}
                message={errors.passsword_confirmation}

            />
            <PrimaryButton type='submit' isLoading={processing} disabled={!isDirty || processing}>Add User</PrimaryButton>
        </form>
    )
}
