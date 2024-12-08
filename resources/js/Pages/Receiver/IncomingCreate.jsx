import { Head, Link, useForm } from '@inertiajs/react';
import ProposalForm from './Partials/ProposalForm';
import React from 'react';
import { useToast } from '@/Components/Toast';
import ReceiverLayout from '@/Layouts/ReceiverLayout';
import SecondaryButton from '@/Components/SecondaryButton';
import useTransactions from '../Shared/Transactions/Hooks/useTransactions';
export default function ProposalCreate() {
        const [state, dispatch] = useTransactions();
        const toast = useToast();
        const { data, setData, post, processing, errors, isDirty } = useForm({
                source: '',
                sourceType: 'External',
                title: '',
                description: '',
                attachments: [],
        });
        
        const handleSubmit = (e) => {
                e.preventDefault();

                post(route('receiver.incoming.store'), {
                        onSuccess: () => {
                                toast('Created', 'Proposal created successfully');
                                dispatch({ type: 'UPDATE_TRANSACTION' });
                        },
                });
        };

        return (
                <ReceiverLayout header={
                        <div className='flex justify-between'>
                                <h2 className="main-header">Create Proposal</h2>
                                <Link href={route('receiver.dashboard')}>
                                        <SecondaryButton>Back</SecondaryButton>
                                </Link>
                        </div>
                }>
                        <Head title={'Create Proposal'} />
                        <div className='content-wrapper'>
                                <section className="section-wrapper">
                                        <header className='mb-6'>
                                                <h2 className="section-header">
                                                        Receive proposal
                                                </h2>

                                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                        Ensure your details is correct before submitting.
                                                </p>
                                        </header>
                                        <ProposalForm
                                                isDirty={isDirty}
                                                onSubmit={handleSubmit}
                                                data={data}
                                                setData={setData}
                                                processing={processing}
                                                errors={errors}
                                        />
                                </section>
                        </div>
                </ReceiverLayout>
        );
}
