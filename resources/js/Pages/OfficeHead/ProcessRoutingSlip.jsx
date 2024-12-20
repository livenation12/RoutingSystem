import React from 'react'
import ProcessRoutingSlipForm from './Partials/ProcessRoutingSlipForm'
import { Head, Link, useForm } from '@inertiajs/react'
import SecondaryButton from '@/Components/SecondaryButton'
import { useToast } from '@/Components/Toast'
import OfficeHeadLayout from '@/Layouts/OfficeHeadLayout'

export default function ProcessRoutingSlip({ officesToEndorsedTo, routingSlip }) {
    const toast = useToast()
    console.log(routingSlip);

    const { data, setData, patch, processing, errors, isDirty } = useForm({
        endorsedToOfficeId: '',
        subject: '',
        urgency: 'Routine',
        action: '',
        actionRequested: '',
        remarks: '',
        additionalRemarks: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        patch(route('office-head.routing-slip.process', { routingSlip: routingSlip.id }), {
            onSuccess: () => {
                toast('Processed!', 'Routing slip processed successfully');
            },
        });
    }
    return (
        <OfficeHeadLayout
            header={
                <div className='flex justify-between'>
                    <h2 className="main-header">Process Routing Slip</h2>
                    <Link href={route('office-head.dashboard')}>
                        <SecondaryButton>Go back</SecondaryButton>
                    </Link>
                </div>
            }>
            <Head title='Process Routing Slip' />
            <div className='content-wrapper'>
                <div className="section-wrapper">
                    <header className='mb-6'>
                        <h2 className="section-header">
                            Process Routing Slip
                        </h2>

                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Ensure your details is correct before submitting.
                        </p>
                    </header>
                    <ProcessRoutingSlipForm
                        isDirty={isDirty}
                        onSubmit={handleSubmit}
                        officesToEndorsedTo={officesToEndorsedTo}
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
