import React from 'react'
import AuthenticatedLayout from '@/Layouts/AdminLayout'
import { Head, Link } from '@inertiajs/react'
import TransactionTable from '../Receiver/Partials/TransactionTable'
import PrimaryButton from '@/Components/PrimaryButton'
import Wrapper from '@/Components/Wrapper'

export default function Index({ auth, transactions }) {
          return (
                    <AuthenticatedLayout
                              header={
                                        <div className='flex justify-between'>
                                                  <h2 className="main-header">
                                                            Transactions
                                                  </h2>
                                                  <Link
                                                            href={route('proposal.create')}
                                                  >
                                                            <PrimaryButton>
                                                                      New Proposal
                                                            </PrimaryButton>

                                                  </Link>
                                        </ div>
                              }>
                              <Head title='Proposals' />
                              <Wrapper>
                                        <TransactionTable transactions={transactions} />
                              </Wrapper>
                    </AuthenticatedLayout>
          )
}
