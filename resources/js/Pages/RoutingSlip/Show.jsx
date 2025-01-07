import SecondaryButton from '@/Components/SecondaryButton'
import Layout from '@/Layouts/Layout'
import { Head, Link, usePage } from '@inertiajs/react'
import React from 'react'

export default function Show({ routingSlip }) {

    const [role] = usePage().props.auth.roles
    console.log(routingSlip);

    return (
        <Layout
            header={
                <div className='flex justify-between'>
                    <h2 className="main-header">
                        Routing Slip
                    </h2>
                    <Link onClick={() => window.history.back()}>
                        <SecondaryButton>
                            Back
                        </SecondaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="Routing Slip" />
            <div className='content-wrapper'>
                <div className="section-wrapper">
                    <div>
                        <h3 className='section-header'>Details</h3>
                        <div className='grid grid-cols-3'>
                            <div className='col-span-2 max-w-2xl border-r p-3'>
                                <dl>
                                    <dt>Doc Tin</dt>
                                    <dd>{routingSlip.docTin}</dd>
                                    {routingSlip.urgency &&
                                        (
                                            <>
                                                <dt>Urgency</dt>
                                                <dd>{routingSlip.urgency}</dd>
                                            </>
                                        )}
                                    <dt>From</dt>
                                    <dd>{routingSlip.fromUser.firstName}</dd>
                                    {routingSlip.subject && (
                                        <>
                                            <dt>Subject</dt>
                                            <dd>{routingSlip.subject}</dd>
                                        </>
                                    )}

                                    {routingSlip.actionRequested &&
                                        <>
                                            <dt>Action requested</dt>
                                            <dd>{routingSlip.actionRequested}</dd>
                                        </>
                                    }

                                    {routingSlip.action &&
                                        <>
                                            <dt>Action</dt>
                                            <dd>{routingSlip.action}</dd>
                                        </>
                                    }
                                    <dt>Status</dt>
                                    <dd>{routingSlip.status}</dd>
                                    <div>

                                    </div>
                                    {routingSlip.remarks.length > 0 &&
                                        <div>
                                            <dt>Remarks</dt>
                                            {routingSlip.remarks.map((remark) => (
                                                <div key={remark.id}>
                                                    <dd><span className='font-semibold text-gray-400'>{remark.office} </span> - {
                                                        remark.message}</dd>
                                                </div>
                                            ))}
                                        </div>
                                    }
                                    {routingSlip.additionalRemarks &&
                                        <>
                                            <dt>Additional Remarks</dt>
                                            <dd>{routingSlip.additionalRemarks}</dd>
                                        </>
                                    }


                                    {/* {routingSlip.endorsedBy &&
                            <>
                                <dt>Office Endorsed by</dt>
                                <dd>{routi}</dd>
                            </>
                            } */}
                                </dl>
                                <div>
                                    <p className='text-sm dark:text-gray-400 font-semibold'>Attachments</p>
                                    <div className='flex max-w-full overflow-auto gap-1.5 h-[300px]'>
                                        {routingSlip.attachments.length > 0 &&
                                            routingSlip.attachments.map((attachment, index) => (
                                                <a href={attachment.url} target='_blank' key={index}>
                                                    <img className='object-cover' src={attachment.url} alt={`attachment[${index}]`} />
                                                </a>
                                            ))
                                        }
                                    </div>

                                </div>
                            </div>
                            <div>
                                <table className='w-full'>
                                    <thead>
                                        <tr>
                                            <th className='text-start py-3'>Action</th>
                                            <th className='text-start py-3'>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            routingSlip.routingLogs.length > 0 &&
                                            routingSlip.routingLogs.map((routingLog) => (
                                                <tr key={routingLog.id}>
                                                    <td className='py-1'>{routingLog.status}</td>
                                                    <td className='py-1'>{routingLog.created_at}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>

                            </div>

                        </div>
                    </div>


                </div>


                <section className="section-wrapper col-span-full">
                    <div className="flex justify-between">
                        <div className='flex'>
                            <dt>Created at</dt>
                            <dd className="text-sm">{routingSlip.createdDate}</dd>
                        </div>

                    </div>
                </section>

            </div>
        </Layout>
    )
}
