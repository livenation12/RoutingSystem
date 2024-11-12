import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AdminLayout'
import { Head, Link } from '@inertiajs/react'
import React from 'react'

export default function Index({ routingSlips }) {
          const { data } = routingSlips
          return (
                    <AuthenticatedLayout
                              header={
                                        <div className='flex justify-between'>
                                                  <h2 className="main-header">
                                                            Routing Slips
                                                  </h2>
                                        </ div>
                              }>
                              <Head title='Routing Slips' />
                              <div className='content-wrapper'>
                                        <section className="section-wrapper">
                                                  <table className='w-full'>
                                                            <thead>
                                                                      <tr>
                                                                                <th>Doc Tin</th>
                                                                                <th>From</th>
                                                                                <th>Urgency</th>
                                                                                <th>Actions</th>
                                                                      </tr>
                                                            </thead>
                                                            <tbody>
                                                                      {data.length > 0 ? data.map((routingSlip) => (
                                                                                <tr key={routingSlip.id}>
                                                                                          <td>{routingSlip.docTin}</td>
                                                                                          <td>{routingSlip.fromUser.fullName}</td>
                                                                                          <td>{routingSlip.urgency}</td>
                                                                                          <td className='inline-flex gap-1.5'>
                                                                                                    <Link
                                                                                                    // href={route('routing-slip.show', routingSlip.id)}
                                                                                                    >
                                                                                                              <PrimaryButton>View</PrimaryButton>
                                                                                                    </Link>
                                                                                                    <Link
                                                                                                    // href={route('routing-slip.show', routingSlip.id)}

                                                                                                    >
                                                                                                              <SecondaryButton>Edit</SecondaryButton>
                                                                                                    </Link>
                                                                                          </td>
                                                                                </tr>
                                                                      ))
                                                                                :
                                                                                <tr>
                                                                                          <td colSpan={5} className='text-center py-2'>No routing slip found</td>
                                                                                </tr>
                                                                      }
                                                            </tbody>
                                                  </table>
                                        </section>
                              </div>
                    </AuthenticatedLayout>
          )
}
