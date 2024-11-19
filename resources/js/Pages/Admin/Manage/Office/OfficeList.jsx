import React from 'react'
import SecondaryButton from '@/Components/SecondaryButton'
import PrimaryButton from '@/Components/PrimaryButton'
import { Link } from '@inertiajs/react'
import { PenBox } from 'lucide-react'
export default function OfficeList({ offices }) {
          return (

                    <>
                              <header className='flex justify-between mb-2'>
                                        <h2 className="section-header">
                                                  Offices
                                        </h2>
                                        <Link href={route('admin.office.create')}>
                                                  <PrimaryButton>New</PrimaryButton>
                                        </Link>

                              </header>
                              <div className='grid lg:grid-cols-2 gap-2'>
                                        {offices.length > 0 ? offices.map((office) => (
                                                  <div key={office.id} className='border rounded-lg p-4'>
                                                            <header className='flex justify-between'>
                                                                      <h2 className="main-text">
                                                                                {office.officeName}
                                                                      </h2>
                                                                      <Link href={route('admin.office.edit', office.id)}>
                                                                                <SecondaryButton><PenBox size={15} /></SecondaryButton>
                                                                      </Link>
                                                            </header>
                                                            <div className="subtext">
                                                                      <p><strong>Office Head: </strong>{office.officeHead.fullName}</p>
                                                                      {office.officialAlternate && <p>Official Alternate: {office.officialAlternate.fullName}</p>}
                                                            </div>
                                                  </div>
                                        )) :
                                                  <div>
                                                            <h2 className='main-text'>No Offices</h2>
                                                  </div>
                                        }
                              </div>
                    </>

          )
}
