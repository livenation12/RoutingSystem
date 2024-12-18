import React from 'react'

export default function TransactionProposal({ proposal }) {
          return (

                    <div className="grid grid-cols-3 mt-3">
                              <dl>
                                        <dt>Tracking ID</dt>
                                        <dd>{proposal.trackingId}</dd>
                                        <dt>Title</dt>
                                        <dd>{proposal.title}</dd>
                                        <dt>Source</dt>
                                        <dd>{proposal.source}</dd>
                                        <dt>Description</dt>
                                        <dd>{proposal.description}</dd>
                              </dl>
                              <div className="col-span-2">
                                        <p className="text-gray-400 text-sm mb-2">Attachments</p>
                                        <div className="flex max-w-full overflow-auto">
                                                  {proposal.attachments.length ? proposal.attachments.map((attachment, index) => (
                                                            <a
                                                                      href={attachment.url}
                                                                      target='_blank'
                                                                      key={index}>
                                                                      <img
                                                                                className='h-full max-w-[300px] object-cover'
                                                                                src={attachment.url}
                                                                                alt={`Attachment[${index}]`} />
                                                            </a>
                                                  )) :
                                                            <p className="text-red-500">No attachments found</p>
                                                  }
                                        </div>
                              </div>
                    </div>

          )
}
