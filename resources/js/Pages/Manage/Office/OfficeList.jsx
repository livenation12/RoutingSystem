import React from 'react'
import SecondaryButton from '@/Components/SecondaryButton'
import PrimaryButton from '@/Components/PrimaryButton'
import { Link } from '@inertiajs/react'
import { PenBox } from 'lucide-react'
export default function OfficeList({ offices }) {
          return (

                    <section className='section-wrapper'>
                              <div className='flex justify-between mb-2'>
                                        <h2 className="text-lg mb-3 font-medium text-gray-900 dark:text-gray-100">
                                                  Offices
                                        </h2>
                                        <Link href={route('office.create')}>
                                                  <PrimaryButton>New</PrimaryButton>
                                        </Link>

                              </div>
                              <div className='grid lg:grid-cols-2 gap-2'>
                                        {offices.length > 0 && offices.map((office) => (
                                                  <div key={office.id} className='border rounded-lg p-4'>
                                                            <header className='flex justify-between'>
                                                                      <h2 className="font-medium text-gray-900 dark:text-gray-100">
                                                                                {office.officeName}
                                                                      </h2>
                                                                      <Link href={route('office.edit', office.id)}>
                                                                                <SecondaryButton><PenBox size={15}/></SecondaryButton>
                                                                      </Link>                                                            </header>
                                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                                      <p><strong>Office Head: </strong>{office.officeHead.fullName}</p>
                                                                      {office.officialAlternate && <p>Official Alternate: {office.officialAlternate.fullName}</p>}
                                                            </div>
                                                  </div>
                                        ))}
                              </div>
                    </section>
          )
}
