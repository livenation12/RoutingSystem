import OfficeHeadLayout from '@/Layouts/OfficeHeadLayout'
import { Head, usePage } from '@inertiajs/react'

import ViewTransaction from '../Shared/Transactions/ViewTransaction'
import TransactionsTable from '../Shared/Transactions/TransactionsTable'
import Layout from '@/Layouts/Layout'
export default function Dashboard({ transactions }) {

    return (
        <Layout>
            <Head title='Office Head' />
            <div className='content-wrapper'>
                <div className='grid md:grid-cols-5 gap-2'>
                    <section className="section-wrapper md:col-span-2 relative">
                        <TransactionsTable transactions={transactions} />
                    </section>
                    <section className="section-wrapper md:col-span-3 max-h-min h-[75vh] overflow-y-auto">
                        <ViewTransaction />
                    </section>
                </div>
            </div>
        </Layout >

    )
}
