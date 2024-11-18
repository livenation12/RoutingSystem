import OfficeHeadLayout from '@/Layouts/OfficeHeadLayout'
import { Head, Link } from '@inertiajs/react'
import React, { useEffect } from 'react'
import UserRoutingTable from '../Shared/RoutingSlip/UserRoutingTable'
import useUserRouting from '../Shared/RoutingSlip/Hooks/useUserRouting'
import PrimaryButton from '@/Components/PrimaryButton'
import ViewTransaction from '../Shared/Transactions/ViewTransaction'
import TransactionsTable from '../Shared/Transactions/TransactionsTable'
export default function Dashboard({ transactions }) {
          // const [state, disapatch] = useUserRouting();
          // useEffect(() => {
          //           if (!state.routing) {
          //                     disapatch({ type: 'SET_ROUTING', payload: routings.data[0] });
          //           }
          // }, [])
          return (
                    <OfficeHeadLayout>
                              <Head title='Office Head' />
                              <div className='content-wrapper'>
                                        <div className='grid md:grid-cols-5 gap-2'>
                                                  <div className="section-wrapper md:col-span-2 relative">
                                                            {/* <UserRoutingTable routings={routings} /> */}
                                                            <TransactionsTable transactions={transactions} />
                                                  </div>
                                                  <div className="section-wrapper md:col-span-3 max-h-[600px] overflow-y-auto">
                                                            {/* {routings.length > 0 &&
                                                                      <>
                                                                                <Link href={route('office-head.routing-slip.form', { routingSlip: state.routing ? state.routing.id : routings.data[0].id })}>
                                                                                          <PrimaryButton>Process</PrimaryButton>
                                                                                </Link> */}
                                                            <ViewTransaction />
                                                            {/* </> */}
                                                            {/* } */}

                                                  </div>
                                        </div>
                              </div>
                    </OfficeHeadLayout >

          )
}
