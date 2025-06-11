import DepartmentHeadLayout from '@/Layouts/DepartmentHeadLayout'
import { Head } from '@inertiajs/react'
import React from 'react'
import TransactionsTable from '../Shared/Transactions/TransactionsTable';
import ViewTransaction from './Partials/ViewTransaction';
export default function Dashboard({ transactions }) {
    return (
        <DepartmentHeadLayout>
            <Head title='Department Head' />
            <div className='content-wrapper'>
                <div className='grid md:grid-cols-5 gap-2'>
                    <section className='section-wrapper md:col-span-2 relative min-h-[80vh] overflow-y-auto'>
                        <TransactionsTable transactions={transactions} />
                    </section>
                    <section className='section-wrapper md:col-span-3 max-h-[80vh] overflow-y-auto'>
                        <ViewTransaction />
                    </section>
                </div>
            </div>
        </DepartmentHeadLayout>
    )
}
