import React from 'react';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import { useToast } from '@/Components/Toast';
import { router } from '@inertiajs/react';

export default function DeleteModal({ openModal, setOpenModal, transaction }) {
          const toast = useToast();
          const handleDelete = () => {
                    router.delete(route('transaction.destroy', transaction.id), {
                              preserveScroll: true,
                              onSuccess: () => {
                                        setOpenModal(false);
                                        toast('Deleted', 'Proposal deleted successfully');
                              },
                    });
          };

          return (
                    <Modal show={openModal} onClose={() => setOpenModal(false)} maxWidth='sm'>
                              <div className='p-6'>
                                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                                  Are you sure to delete this proposal
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                  Are you sure to delete this transaction? <br />
                                                  Note that all of its related documents will also be deleted.
                                        </p>

                                        <div className='flex justify-end space-x-2 pt-4'>
                                                  <SecondaryButton onClick={() => setOpenModal(false)}>Cancel</SecondaryButton>
                                                  <DangerButton onClick={handleDelete}>Delete</DangerButton>
                                        </div>
                              </div>
                    </Modal >
          );
}
