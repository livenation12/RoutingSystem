import Wrapper from '@/Components/Wrapper';
import { Head, useForm, usePage } from '@inertiajs/react';
import React from 'react';
import { useToast } from '@/Components/Toast';
import { Link } from '@inertiajs/react';
import SecondaryButton from '@/Components/SecondaryButton';
import Form from './Partials/Form';
import Layout from '@/Layouts/Layout';

export default function RoutingSlipCreate({ transaction, offices }) {
    const [role] = usePage().props.auth.roles
    const toast = useToast();
    const { data, setData, post, processing, errors, isDirty } = useForm({
        transactionId: transaction.id,
        urgency: '',
        subject: '',
        action: '',
        endorsedToOfficeId: '',
        status: '',
        additionalRemarks: '',
        actionRequested: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('routing-slip.store'), {
            onSuccess: () => {
                toast('Created', 'Routing slip created successfully');
            },
        });
    };

    const backRoute = role === 'receiver' ? route('receiver.dashboard') : route('transaction.show', transaction.id)

    return (
        <Layout
            header={
                <div className='flex justify-between'>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        New Routing Slip
                    </h2>

                    <Link href={backRoute}>
                        <SecondaryButton>Go back</SecondaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="Create Routing Slip" />
            <Wrapper>
                <header>
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Create Routing Slip
                    </h2>

                    <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        <p>Ensure your details is correct before submitting.</p>
                        <p>
                            All of the fields with (<span className='text-red-500'>*</span>) are required.
                        </p>
                    </div>
                </header>
                <Form
                    onSubmit={handleSubmit}
                    offices={offices}
                    setData={setData}
                    data={data}
                    processing={processing}
                    errors={errors}
                    isDirty={isDirty} />
            </Wrapper>
        </Layout>
    );
}
