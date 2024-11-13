import SecondaryButton from '@/Components/SecondaryButton'
import ReceiverLayout from '@/Layouts/ReceiverLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import React from 'react'
import InitialRoutingSlipForm from './Partials/InitialRoutingSlipForm'
import { useToast } from '@/Components/Toast'

export default function InitialRoutingSlipCreate({ transaction }) {
    const toast = useToast()
    const { data, setData, post, processing, errors, isDirty } = useForm({
        urgency: '',
        subject: '',
        action: '',
        actionRequested: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(data)
        post(route('receiver.initial-routing.initialize', { transaction: transaction.id }), {
            onSuccess: () => {
                toast('Created', 'Routing slip initialized successfully');
            },
        });
    }

    return (
        <ReceiverLayout
            header={
                <div className='flex justify-between'>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Initial Routing Slip
                    </h2>

                    <Link href={route('receiver.dashboard')}>
                        <SecondaryButton>Go back</SecondaryButton>
                    </Link>
                </div>
            }
        >
            <Head title={'Initialize'} />
            <div className="content-wrapper">
                <div className="section-wrapper">
                    <InitialRoutingSlipForm
                        onSubmit={handleSubmit}
                        errors={errors}
                        data={data}
                        setData={setData}
                        processing={processing}
                        isDirty={isDirty}
                    />
                </div>
            </div>
        </ReceiverLayout>
    )
}
