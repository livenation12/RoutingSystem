import React from 'react'
import useTransactions from './Hooks/useTransactions';
import { Link, usePage } from '@inertiajs/react';
import RoutingList from '@/Pages/Shared/RoutingSlip/Partials/RoutingList';
import PrimaryButton from '@/Components/PrimaryButton';


//This component should be wrapped by TransactionProvider
export default function ViewTransaction() {
  const [state, dispatch] = useTransactions();
  const { transaction } = state;

  if (!transaction) {
    return (
      <p>No transaction to view yet</p>
    )
  }

  return (
    <div className='space-y-5'>
      <div className='flex justify-between'>
        <h3 className='section-header mb-1'>Proposal</h3>
        {transaction.routingSlips.length === 0 ?
          <Link href={route('receiver.initial-routing.create', { transaction: transaction.id })}>
            <PrimaryButton>
              Initialize Routing
            </PrimaryButton>
          </Link>
          : null
        }
      </div>
      <img className='object-cover max-h-min h-[300px] w-full' src={transaction?.proposal.attachment} alt="" />
      <div className='space-y-2 relative'>
        <div>
          <span className='text-gray-300'>Traking ID</span>
          <p className='ms-2 text-gray-400'>{transaction?.proposal.trackingId}</p>
        </div>
        <div>
          <span className='text-gray-300'>Title</span>
          <p className='ms-2 text-gray-400'>{transaction?.proposal.title}</p>
        </div>
        <div>
          <span className='text-gray-300'>Source</span>
          <p className='ms-2 text-gray-400'>{transaction?.proposal.source}</p>
        </div>
        <div>
          <span className='text-gray-300'>Description</span>
          <p className='ms-2 text-gray-400'>{transaction?.proposal.description}</p>
        </div>
      </div>

      <div>
        <RoutingList routingSlips={transaction.routingSlips} transactionId={transaction.id} />
      </div>
    </div>
  )
}
