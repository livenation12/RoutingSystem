import { Head } from '@inertiajs/react'
import React from 'react'
import ViewTransaction from '@/Pages/Shared/Transactions/ViewTransaction'
import { TransactionProvider } from '@/Pages/Shared/Transactions/Contexts/TransactionsContext'
import AdminLayout from '@/Layouts/AdminLayout'
import TransactionsTable from '@/Pages/Shared/Transactions/TransactionsTable'
import TransactionRoutings from './Partials/TransactionRoutings'
export default function Index({ transactions }) {//this prop is incased/wrap by a data
          return (
                    <TransactionProvider>
                              <AdminLayout
                                        header={
                                                  <div className='flex justify-between'>
                                                            <h2 className='main-header'>Transactions</h2>
                                                  </div>
                                        }>
                                        <Head title={'Transactions'} />
                                        <div className='content-wrapper'>
                                                  <div className='grid md:grid-cols-5 gap-2'>
                                                            <section className='section-wrapper md:col-span-2 max-h-[600px] overflow-y-auto relative'>
                                                                      <TransactionsTable transactions={transactions} />
                                                            </section>
                                                            <section className='section-wrapper md:col-span-3 max-h-[600px] overflow-y-auto space-y-5'>
                                                                      <ViewTransaction />
                                                                      <TransactionRoutings />
                                                            </section>
                                                  </div>
                                        </div>
                              </AdminLayout>
                    </TransactionProvider>
          )
}
