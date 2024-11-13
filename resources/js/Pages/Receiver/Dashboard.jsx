import ReceiverLayout from '@/Layouts/ReceiverLayout'
import { Head, Link } from '@inertiajs/react'
import React from 'react'
import TransactionsTable from '../Shared/Transactions/TransactionsTable'
import PrimaryButton from '@/Components/PrimaryButton'
import { TransactionProvider } from '../Shared/Transactions/Contexts/TransactionsContext'
import ViewTransaction from '../Shared/Transactions/ViewTransaction'

export default function Dashboard({ transactions }) {
    return (
        <TransactionProvider>
            <ReceiverLayout
                header={
                    <div className='flex justify-between'>
                        <h2 className='main-header'>Transactions</h2>
                        <Link href={route('receiver.incoming.create')}>
                            <PrimaryButton>
                                New Proposal
                            </PrimaryButton>
                        </Link>
                    </div>
                }>
                <Head title={'Receiving'} />
                <div className='content-wrapper'>
                    <div className='grid md:grid-cols-5 gap-2'>
                        <section className='section-wrapper md:col-span-2 max-h-[600px] overflow-y-auto relative'>
                            <TransactionsTable transactions={transactions} />
                        </section>
                        <section className='section-wrapper md:col-span-3 max-h-[600px] overflow-y-auto'>
                            <ViewTransaction />
                        </section>
                    </div>
                </div>
            </ReceiverLayout>
        </TransactionProvider>
    )
}
