import SecondaryButton from '@/Components/SecondaryButton'
import ReceiverLayout from '@/Layouts/ReceiverLayout'
import { Head, Link, router, useForm } from '@inertiajs/react'
import TransactionEditForm from './Partials/TransactionEditForm'
import ProposalAttaachmentRemoval from './Partials/ProposalAttaachmentRemoval'
import PrimaryButton from '@/Components/PrimaryButton'


export default function TransactionEdit({ transaction }) {
          const { data, setData, patch, processing, errors, isDirty } = useForm({
                    source: transaction.proposal.source || '',
                    title: transaction.proposal.title || '',
                    description: transaction.proposal.description || '',
          });

          const handleUpdateSubmit = (e) => {
                    e.preventDefault();
                    patch(route('receiver.transaction.update', transaction.id));
          }

          const handleFileSelection = (e) => {
                    const formData = new FormData();
                    // Append each file to the form data
                    Array.from(e.target.files).forEach(file => {
                              formData.append('attachments[]', file); // Append the file
                    });
                    // Send the form data to the backend
                    router.post(route('receiver.attachment.store', transaction.id), formData, {
                              preserveScroll: true
                    });
          }

          return (
                    <ReceiverLayout header={
                              <div className='flex justify-between'>
                                        <h2 className='main-header'>Transaction</h2>
                                        <Link href={route('receiver.dashboard')}>
                                                  <SecondaryButton>Go Back</SecondaryButton>
                                        </Link>
                              </div>
                    }>
                              <Head title={'Transaction Edit'} />
                              <div className="content-wrapper">

                                        <section className="section-wrapper">
                                                  <header className='mb-6'>
                                                            <h2 className="section-header">
                                                                      Edit Details
                                                            </h2>
                                                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                                      Ensure your details is correct before submitting.
                                                            </p>
                                                  </header>
                                                  <TransactionEditForm
                                                            transaction={transaction}
                                                            onSubmit={handleUpdateSubmit}
                                                            data={data}
                                                            setData={setData}
                                                            patch={patch}
                                                            processing={processing}
                                                            errors={errors}
                                                            isDirty={isDirty}
                                                  />
                                        </section>

                                        <div className='grid grid-cols-12 gap-2'>
                                                  <PrimaryButton className="relative flex items-center justify-center">
                                                            <input
                                                                      multiple
                                                                      onChange={handleFileSelection}
                                                                      type="file"
                                                                      className="absolute inset-0 opacity-0 cursor-pointer"
                                                            />
                                                            <span className="-rotate-90 transform origin-center whitespace-nowrap">
                                                                      Add attachment
                                                            </span>
                                                  </PrimaryButton>
                                                  <section className="section-wrapper col-span-11">
                                                            <ProposalAttaachmentRemoval transaction={transaction} />
                                                  </section>
                                        </div>
                              </div>
                    </ReceiverLayout>
          )
}
