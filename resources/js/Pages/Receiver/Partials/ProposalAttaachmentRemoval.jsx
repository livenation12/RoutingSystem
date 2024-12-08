import DangerButton from '@/Components/DangerButton'
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import { useForm } from '@inertiajs/react';
import { X } from 'lucide-react';
import { useState } from 'react';

export default function ProposalAttaachmentRemoval({ transaction }) {
          const [showConfirmModal, setShowConfirmModal] = useState(false);
          const { data, setData, delete: destroy, processing } = useForm({
                    attachmentIds: []
          })

          const handleAttachmentCheckedChange = (e) => {
                    const attachmentId = e.target.value
                    if (e.target.checked) {
                              setData((prev) => ({ attachmentIds: [...prev.attachmentIds, attachmentId] }))
                    } else {
                              setData((prev) => ({ attachmentIds: prev.attachmentIds.filter((id) => id !== attachmentId) }))
                    }
          }

          const handleAttachmentRemoval = () => {
                    destroy(route('receiver.attachment.remove', { transaction: transaction?.id }), {
                              preserveScroll: true,
                              onSuccess: () => {
                                        setData({ attachmentIds: [] })
                                        setShowConfirmModal(false)
                              }
                    })
          }

          return (
                    <>
                              <header className='mb-6 flex justify-between'>
                                        <div>
                                                  <h2 className="section-header">
                                                            Attachments
                                                  </h2>
                                                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                            Remove unwanted attachments here. <br />
                                                            Check all attachments you wanted to remove
                                                  </p>

                                        </div>
                                        <div>

                                                  <DangerButton
                                                            disabled={data?.attachmentIds?.length === 0}
                                                            onClick={() => setShowConfirmModal(true)}
                                                  >Remove
                                                  </DangerButton>
                                        </div>
                              </header>
                              <div className='flex max-h-min h-[300px] gap-2 overflow-x-auto'>
                                        {transaction.proposal.attachments && transaction.proposal.attachments.map((attachment) => (
                                                  <div key={attachment.id} className='relative'>
                                                            <input
                                                                      type='checkbox'
                                                                      value={attachment.id}
                                                                      id={attachment.id}
                                                                      onChange={handleAttachmentCheckedChange}
                                                                      className='size-5 rounded-full text-blue-500 absolute top-2 right-2'
                                                            />
                                                            <label htmlFor={attachment.id}>
                                                                      <img className='h-full max-w-[300px] object-cover' src={attachment.url} alt="" />
                                                            </label>
                                                            <a
                                                                      href={attachment.url}
                                                                      className='backdrop-blur-sm bg-gray-500/50 rounded p-3 underline text-sm absolute bottom-3 left-2'
                                                                      target='_blank'
                                                            >See Attachment
                                                            </a>
                                                  </div>
                                        ))}
                              </div>
                              <Modal show={showConfirmModal} onClose={() => setShowConfirmModal(false)}>
                                        <SecondaryButton
                                                  onClick={() => setShowConfirmModal(false)}
                                                  className='main-text absolute top-3 right-3'
                                        ><X />
                                        </SecondaryButton>
                                        <div className='p-6 space-y-8'>
                                                  <header>
                                                            <h3 className="main-text">
                                                                      Attachment Removal
                                                            </h3>
                                                            <p className='subtext'>Are you sure you want to remove those checked attachments?</p>
                                                  </header>
                                                  <div className='flex justify-end gap-2'>
                                                            <SecondaryButton onClick={() => setShowConfirmModal(false)}>
                                                                      Cancel
                                                            </SecondaryButton>
                                                            <DangerButton
                                                                      disabled={data?.attachmentIds?.length === 0}
                                                                      isLoading={processing}
                                                                      onClick={handleAttachmentRemoval}
                                                            >Remove
                                                            </DangerButton>
                                                  </div>

                                        </div>
                              </Modal>
                    </>
          )
}
