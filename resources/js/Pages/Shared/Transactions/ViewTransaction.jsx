import React from 'react'
import useTransactions from './Hooks/useTransactions';
import SecondaryButton from '@/Components/SecondaryButton';
import { Link, usePage } from '@inertiajs/react';
import { PenBox } from 'lucide-react';


//This component should be wrapped by TransactionProvider
export default function ViewTransaction() {
          const [state, dispatch] = useTransactions();
          const { roles } = usePage().props.auth
          return (
                    <div className='space-y-3'>
                              <h2 className='section-header'>Proposal</h2>
                              <img className='object-cover' src={state.viewingTransaction?.proposal.attachment} alt="" />
                              <div className='space-y-2 relative'>
                                        {roles.includes('receiver') || roles.includes('admin') &&
                                                  <Link className='absolute right-2 top-2'>
                                                            <SecondaryButton>
                                                                      <PenBox />
                                                            </SecondaryButton>
                                                  </Link>
                                        }
                                        <div>
                                                  <span className='text-gray-300'>Traking ID</span>
                                                  <p className='ms-2 text-gray-400'>{state.viewingTransaction?.proposal.trackingId}</p>
                                        </div>
                                        <div>
                                                  <span className='text-gray-300'>Title</span>
                                                  <p className='ms-2 text-gray-400'>{state.viewingTransaction?.proposal.title}</p>
                                        </div>
                                        <div>
                                                  <span className='text-gray-300'>Source</span>
                                                  <p className='ms-2 text-gray-400'>{state.viewingTransaction?.proposal.source}</p>
                                        </div>
                                        <div>
                                                  <span className='text-gray-300'>Description</span>
                                                  <p className='ms-2 text-gray-400'>{state.viewingTransaction?.proposal.description}</p>
                                        </div>
                              </div>
                    </div>
          )
}
