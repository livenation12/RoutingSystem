import SecondaryButton from '@/Components/SecondaryButton'
import Wrapper from '@/Components/Wrapper'
import AuthenticatedLayout from '@/Layouts/AdminLayout'
import { Head, Link } from '@inertiajs/react'
import PrimaryButton from '@/Components/PrimaryButton'
import DeleteTransaction from './Partials/DeleteTransaction'
import RoutingList from '../Shared/RoutingSlip/Partials/RoutingList'
export default function TransactionShow({ transaction }) {
          const { proposal } = transaction

          return (
                    <AuthenticatedLayout
                              header={
                                        <div className="flex justify-between">
                                                  <h2 className="main-header space-x-2">
                                                            Transaction View  {proposal.trackingId}

                                                  </h2>
                                                  <Link href={route('transaction.index')}>
                                                            <SecondaryButton>Go back</SecondaryButton>
                                                  </Link>
                                        </div>
                              }>
                              <Head title='Proposal View' />
                              <Wrapper>
                                        <div className='flex justify-between'>
                                                  <h2 className='text-lg mb-3 font-medium text-gray-900 dark:text-gray-100'>Proposal</h2>
                                                  <div className='space-x-2'>
                                                            <Link href={route('routing-slip.create', { transaction: transaction.id })}>
                                                                      <PrimaryButton>
                                                                                Create Routing Slip
                                                                      </PrimaryButton>
                                                            </Link>
                                                            <Link href={route('transaction.edit', transaction.id)}>
                                                                      <SecondaryButton>Edit</SecondaryButton>
                                                            </Link>
                                                  </div>
                                        </div>
                                        <div className='grid lg:grid-cols-2 gap-5'>
                                                  <img src={proposal.attachment} alt={proposal.title} className='w-full px-20 md:px-10 lg:px-2 object-cover' />
                                                  <div className='p-3'>
                                                            <h1 className="text-2xl font-bold">{proposal.title}</h1>
                                                            <p className="mt-2 text-gray-300"><strong>Source:</strong> {proposal.source}</p>
                                                            <p className="mt-2 text-gray-300"><strong>Source type:</strong> {proposal.sourceType}</p>
                                                            <p className="mt-2 text-gray-300"><strong>Received by:</strong> {transaction.receivedBy.fullName}</p>
                                                            <p className='mt-2 text-gray-300'><strong>Accomplishment date:</strong>
                                                                      <span className={`${transaction.accomplishmentDate == 'On going' && 'text-red-500'}`}> {transaction.accomplishmentDate}</span>
                                                            </p>
                                                            <p className="mt-2 text-sm text-gray-300">{proposal.description}</p>
                                                  </div>
                                        </div>
                              </Wrapper>
                              <RoutingList transactionId={transaction.id} routingSlips={transaction.routingSlips} />
                              <Wrapper>
                                        <DeleteTransaction transaction={transaction} />
                              </Wrapper>
                    </AuthenticatedLayout>
          )
}
