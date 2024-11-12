import React from 'react'
import DeleteModal from './DeleteModal'
import DangerButton from '@/Components/DangerButton'
import { useState } from 'react'
export default function DeleteTransaction({ className, transaction }) {
          const [openModal, setOpenModal] = useState(false)

          return (
                    <section className={`space-y-6 max-w-xl ${className}`}>
                              <header>
                                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                                  Delete Transaction
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                  Once this proposal is deleted, all of its related documents and data
                                                  will be permanently deleted.
                                        </p>
                              </header>
                              <DangerButton onClick={() => setOpenModal(true)}>Delete</DangerButton>
                              <DeleteModal openModal={openModal} setOpenModal={setOpenModal} transaction={transaction} />
                    </section>
          )
}
