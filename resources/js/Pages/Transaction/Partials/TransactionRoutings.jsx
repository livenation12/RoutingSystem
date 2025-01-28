import SecondaryButton from '@/Components/SecondaryButton'
import { Link } from '@inertiajs/react'
import React from 'react'

export default function TransactionRoutings({ routingSlips }) {
     return (
          <div>
               {routingSlips.length > 0 ?
                    <div className="grid lg:grid-cols-2 gap-3">
                         {routingSlips.map((routing, index) => (
                              <div className="relative" key={index}>
                                   <SecondaryButton className='absolute right-2 top-2'>
                                        <Link href={route('routing.show', routing.id)}>Details</Link>
                                   </SecondaryButton>

                                   <dl className="border grid grid-cols-2 p-3 rounded-lg">
                                        <div>
                                             <dt>Doc TIN</dt>
                                             <dd>{routing.docTin}</dd>
                                        </div>
                                        <div>
                                             <dt>From</dt>
                                             <dd>{routing.fromUser.fullName}</dd>
                                        </div>
                                        {routing.endorsedTo &&
                                             <div>
                                                  <dt>Endorsed to</dt>
                                                  <dd>{routing.endorsedTo?.officeName}</dd>
                                             </div>
                                        }
                                        {index === 0 &&
                                             <>
                                                  <div>
                                                       <dt>Urgency</dt>
                                                       <dd>{routing.urgency}</dd>
                                                  </div>
                                                  <div>
                                                       <dt>Subject</dt>
                                                       <dd>{routing.subject}</dd>
                                                  </div>
                                                  <div>
                                                       <dt>Action</dt>
                                                       <dd>{routing.action}</dd>
                                                  </div>
                                                  <div>
                                                       <dt>Action Requested</dt>
                                                       <dd>{routing.actionRequested}</dd>
                                                  </div>
                                             </>
                                        }

                                        <div className='col-span-full'>
                                             <p className='dark:text-gray-400 font-semibold'>Remarks</p>
                                             {routing.remarks.length > 0 ? routing.remarks.map((remark, index) => (
                                                  <div key={index}>
                                                       <dt>{remark.office}</dt>
                                                       <dd> {remark.message}</dd>
                                                  </div>
                                             )) :
                                                  '--'
                                             }
                                        </div>
                                        <div className='col-span-full'>
                                             <dt>Additional remarks</dt>
                                             <dd>{routing.additionalRemarks}</dd>
                                        </div>
                                        {routing.attachments.length > 0 &&
                                             <div>
                                                  <h5>Attachments</h5>
                                                  <div className='flex max-w-full overflow-auto gap-2'>
                                                       {
                                                            routing.attachments && routing.attachments.map((attachment, index) => (
                                                                 <a target='_blank' href={attachment.url} key={index} >
                                                                      <img src={attachment.url} alt={index} />

                                                                 </a>
                                                            ))
                                                       }
                                                  </div>
                                             </div>
                                        }


                                   </dl>
                              </div>
                         ))}

                    </div>
                    :
                    <span className="text-gray-500">No routings</span>
               }
          </div>
     )
}
