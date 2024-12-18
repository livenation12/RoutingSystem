import SecondaryButton from '@/Components/SecondaryButton'
import OfficeHeadLayout from '@/Layouts/OfficeHeadLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import React from 'react'
import RevertRoutingForm from './Partials/RevertRoutingForm'

export default function RevertRouting({ routingSlip, offices }) {
    const { data, setData, processing, errors, post, isDirty } = useForm({
        remarks: '',
        additionalRemarks: '',
        office: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        post(route('office-head.routing-slip.revert', routingSlip.id), {
            onSuccess: () => {
                toast('Reverted!', 'Routing slip reverted successfully');
            },
        })
    }

    return (
        <OfficeHeadLayout
            header={
                <div className='flex justify-between'>
                    <h1 className='main-header'>Revert Routing</h1>
                    <Link onClick={() => window.history.back()}>
                        <SecondaryButton>Back</SecondaryButton>
                    </Link>
                </div>
            }
        >
            <Head title='Revert Routing' />
            <div className="content-wrapper">
                <div className="section-wrapper">
                    <header className='mb-6'>
                        <h2 className="section-header">
                            Revert Routing
                        </h2>

                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Ensure your details is correct before submitting.
                        </p>
                    </header>
                    <RevertRoutingForm
                        offices={offices}
                        isDirty={isDirty}
                        onSubmit={handleSubmit}
                        errors={errors}
                        setData={setData}
                        data={data}
                        processing={processing}
                    />
                </div>
            </div>
        </OfficeHeadLayout>
    )
}
