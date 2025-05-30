import { Head } from '@inertiajs/react'
import React from 'react'
import ViewTransaction from '@/Pages/Shared/Transactions/ViewTransaction'
import AdminLayout from '@/Layouts/AdminLayout'
import TransactionsTable from '@/Pages/Shared/Transactions/TransactionsTable'
export default function Index({ transactions, search }) {//this prop is incased/wrap by a data    
    return (
        <AdminLayout>
            <Head title={'Transactions'} />
            <div className='content-wrapper'>
                <div className='grid md:grid-cols-5 gap-2'>
                    <section className='section-wrapper md:col-span-2 max-h-[600px] overflow-y-auto relative'>
                        <TransactionsTable transactions={transactions} search={search} />
                    </section>
                    <section className='section-wrapper md:col-span-3 max-h-[600px] overflow-y-auto space-y-5'>
                        <ViewTransaction />
                    </section>
                </div>
            </div>
        </AdminLayout>
    )
}
