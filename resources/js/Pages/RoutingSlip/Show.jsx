import SecondaryButton from '@/Components/SecondaryButton'
import Layout from '@/Layouts/Layout'
import { Head, Link, usePage } from '@inertiajs/react'
import React from 'react'

export default function Show({ routingSlip }) {

    const [role] = usePage().props.auth.roles

    // const backingRoute = role === 'receiver' ? route('receiver.dashboard') : route('transaction.show', routingSlip.transactionId)
    console.log(role);

    console.log(routingSlip);

    return (
        <Layout
            header={
                <div className='flex justify-between'>
                    <h2 className="main-header">
                        Routing Slip
                    </h2>
                    <Link onClick={() => window.history.back()}>
                        <SecondaryButton>
                            Back
                        </SecondaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="Routing Slip" />
            <div className='content-wrapper'>
                <div className="section-wrapper">
                    <h3 className='section-header'>Details</h3>
                    <div className='max-w-xl'>
                        <dl>
                            <dt>From</dt>
                            <dd>{routingSlip.fromUser.firstName}</dd>

                            <dt>Action requested</dt>
                            <dd>{routingSlip.actionRequested}</dd>

                            <dt>Action</dt>
                            <dd>{routingSlip.action}</dd>
                        </dl>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
