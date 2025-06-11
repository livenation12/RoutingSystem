import React from 'react'
import { Link, usePage } from '@inertiajs/react';
import RoutingList from '@/Pages/Shared/RoutingSlip/Partials/RoutingList';
import SecondaryButton from '@/Components/SecondaryButton';
import { PenBox } from 'lucide-react';
import useTransactions from '@/Pages/Shared/Transactions/Hooks/useTransactions';

//This component should be wrapped by TransactionProvider
export default function ViewTransaction() {
  const [role] = usePage().props.auth.roles
  const [state] = useTransactions();
  const { transaction } = state;
  
  if (!transaction) {
    return (
      <p className='text'>No transaction to view yet</p>
    )
  }

  return (
    <div className='space-y-5'>
      <div className='flex justify-between'>
        <h3 className='section-header mb-1'>Proposal</h3>
      </div>
      <div className='flex max-h-[300px] space-x-1 overflow-auto'>
        {transaction.proposal.attachments.length > 0 ?
          transaction.proposal.attachments.map((attachment, index) => (
            <a href={attachment.url} className='underline text-blue-500' target='_blank' key={index}>
              <img className='h-[300px] w-[300px] object-cover' src={attachment.url} alt={`Attachment ${index +1}`} />
            </a>
          )) :
          <p className='text-red-500'>All attachments are deleted, Please update this transaction</p>
        }
      </div>
      <div className='space-y-2 relative grid md:grid-cols-2'>
        
          <Link className='absolute right-0 top-0' href={route('receiver.transaction.edit', transaction.id)} title='Edit'>
            <SecondaryButton>
              <PenBox />
            </SecondaryButton>
          </Link>
  
        <dl>
          <dt>Traking ID</dt>
          <dd>{transaction?.proposal.trackingId}</dd>
          <dt>Title</dt>
          <dd>{transaction?.proposal.title}</dd>
          <dt>Source</dt>
          <dd>{transaction?.proposal.source}</dd>
          <dt>Description</dt>
          <dd>{transaction.proposal.description}</dd>
          <dt>Accomplishment date</dt>
          <dd>{transaction.accomplishmentDate}</dd>
        </dl>
      </div>
      <div>
        <RoutingList routingSlips={transaction.routingSlips} transactionId={transaction.id} />
      </div>
    </div>
  )
}
