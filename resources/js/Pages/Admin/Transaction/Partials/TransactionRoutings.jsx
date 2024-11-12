import useTransactions from '@/Pages/Shared/Transactions/Hooks/useTransactions';
import { Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { Eye, LoaderCircle, PenBox } from 'lucide-react';
import React from 'react'

export default function TransactionRoutings() {
          const [state, dispatch] = useTransactions();
          
          // return (
          //           <div>
          //                     <div className='flex justify-between'>
          //                               <h2 className='section-header'>Routing Slips</h2>

          //                     </div>

          //                     <div className='my-4'>
          //                               {routingSlips &&
          //                                         routingSlips.length > 0 ?
          //                                         <div className='grid lg:grid-cols-2 gap-2'>
          //                                                   {routingSlips.map((routingSlip) => (
          //                                                             <div key={routingSlip.id} className='border rounded-lg p-4'>
          //                                                                       <header className='flex justify-between'>
          //                                                                                 <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          //                                                                                           From {routingSlip.fromUser.fullName}
          //                                                                                 </h2>
          //                                                                                 <div className="inline-flex gap-2">
          //                                                                                           <Link href={route('routing-slip.show', { id: routingSlip.id })}>
          //                                                                                                     <PrimaryButton>
          //                                                                                                               <Eye />
          //                                                                                                     </PrimaryButton>
          //                                                                                           </Link>
          //                                                                                           <SecondaryButton><PenBox /></SecondaryButton>
          //                                                                                 </div>
          //                                                                       </header>
          //                                                                       <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          //                                                                                 <strong>Subject:</strong>  {routingSlip.subject}
          //                                                                       </p>
          //                                                             </div>
          //                                                   ))}
          //                                         </div>
          //                                         :
          //                                         <>
          //                                                   <p className='text-gray-300'>No routing slip found</p>
          //                                                   <Link href={route('routing-slip.create', { transaction: id })} className="ml-2">
          //                                                             <PrimaryButton>Create</PrimaryButton>
          //                                                   </Link>
          //                                         </>

          //                               }
          //                     </div>
          //           </div>
          // )
}
