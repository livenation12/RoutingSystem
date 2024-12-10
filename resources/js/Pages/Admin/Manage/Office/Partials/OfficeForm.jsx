import React from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import { FormInput, FormSelect } from '@/Components/FormEntities';
export default function OfficeForm({ onSubmit, errors, data, setData, processing, isDirty, users, type = 'create' }) {

    const structureUsers = users.map((user) => ({ label: user.fullName, value: user.id }))
    const handleChange = (e) => {
        const { name, value } = e.target
        setData((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    return (
        <form onSubmit={onSubmit} className='max-w-xl space-y-6 mt-5'>
            <FormInput
                required
                name='officeName'
                labelValue='Office Name'
                value={data.officeName}
                message={errors.officeName}
                onChange={handleChange} />
            <FormInput
                required
                name='abbr'
                labelValue='Abbreviation'
                value={data.abbr}
                message={errors.abbr}
                onChange={handleChange}
            />
            <FormSelect
                options={structureUsers}
                name='officeHeadId'
                labelValue='Office Head'
                value={data.officeHeadId}
                message={errors.officeHeadId}
                onChange={handleChange} />

            <FormSelect
                options={structureUsers}
                name='officialAlternateId'
                labelValue='Official Alternate'
                value={data.officialAlternateId}
                message={errors.officialAlternateId}
                onChange={handleChange} />

            <PrimaryButton type="submit" isLoading={processing} disabled={!isDirty || processing} loadingText='Submitting'>{type}</PrimaryButton>

        </form>

    );
}
