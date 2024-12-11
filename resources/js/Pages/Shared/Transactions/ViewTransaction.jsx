import React from 'react'
import useTransactions from './Hooks/useTransactions';
import { Link, usePage } from '@inertiajs/react';
import RoutingList from '@/Pages/Shared/RoutingSlip/Partials/RoutingList';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { PenBox } from 'lucide-react';

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
        {transaction.routingSlips.length === 0 && role === 'receiver' ?
          <Link href={route('receiver.initial-routing.create', { transaction: transaction.id })}>
            <PrimaryButton>
              Initialize Routing
            </PrimaryButton>
          </Link>
          : null
        }
      </div>
      <div className='flex max-h-min h-[300px] overflow-x-auto'>
        {transaction.proposal.attachments.length > 0 ? transaction.proposal.attachments.map((attachment, index) => (
          <a href={attachment.url} target='_blank' key={index}>
            <img className='h-full max-w-[300px] object-cover' src={attachment.url} alt="Transaction attachment" />
          </a>
        )) :
          <p className='text-red-500'>All attachments are deleted, Please update this transaction</p>
        }
      </div>
      <div className='space-y-2 relative grid md:grid-cols-2'>
        {role === 'receiver' || role === 'admin' ?
          <Link className='absolute right-0 top-0' href={route('receiver.transaction.edit', transaction.id)} title='Edit'>
            <SecondaryButton>
              <PenBox />
            </SecondaryButton>
          </Link>
          : null
        }
        <dl>
          <dt>Traking ID</dt>
          <dd>{transaction?.proposal.trackingId}</dd>
          <dt>Title</dt>
          <dd>{transaction?.proposal.title}</dd>
          <dt>Source</dt>
          <dd>{transaction?.proposal.source}</dd>
          <dt>Description</dt>
          <dd>{transaction.proposal.description}</dd>
        </dl>
      </div>
      <div>
        <RoutingList routingSlips={transaction.routingSlips} transactionId={transaction.id} />
      </div>
    </div>
  )
}