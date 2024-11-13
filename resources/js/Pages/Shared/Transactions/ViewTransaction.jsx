import React from 'react'
import useTransactions from './Hooks/useTransactions';
import SecondaryButton from '@/Components/SecondaryButton';
import { Link, usePage } from '@inertiajs/react';
import { PenBox } from 'lucide-react';
import PrimaryButton from '@/Components/PrimaryButton';
import RoutingList from '@/Pages/Shared/RoutingSlip/Partials/RoutingList';


//This component should be wrapped by TransactionProvider
export default function ViewTransaction() {
  const [state, dispatch] = useTransactions();
  const [role] = usePage().props.auth.roles
  if (!state.viewingTransaction) {
    return (
      <p>No incoming yet</p>
    )
  }

  const createRoute = role === 'receiver' ? 'receiver.initial-routing.create' : 'routing-slip.create'

  console.log(state.viewingTransaction)

  return (
    <div className='space-y-5'>
      <div>
        <h3 className='section-header mb-1'>Proposal</h3>
        <img className='object-cover' src={state.viewingTransaction?.proposal.attachment} alt="" />
        <div className='space-y-2 relative'>
          {role === 'receiver' || role === 'admin' &&
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
      <div>
        <RoutingList routingSlips={state.viewingTransaction.routingSlips} transactionId={state.viewingTransaction.id} />
      </div>
    </div >
  )
}
