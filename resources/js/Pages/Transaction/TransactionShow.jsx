import SecondaryButton from "@/Components/SecondaryButton";
import Layout from "@/Layouts/Layout";
import { Head, Link } from "@inertiajs/react";


export default function TransactionShow({ transaction }) {
    const { proposal } = transaction
    console.log(transaction);

    return (
        <Layout header={
            <div className="flex justify-between">
                <h1 className="main-header">Transaction</h1>
                <div>
                    <Link onClick={() => window.history.back()}>
                        <SecondaryButton>Back</SecondaryButton>
                    </Link>
                </div>
            </div>
        }>
            <Head title="Transaction Details" />
            <div className="content-wrapper">
                <section className="section-wrapper">
                    <h2 className="section-header">Proposal</h2>
                    <div className="grid grid-cols-2 mt-3">
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
                        <div>
                            <h3>Attachments</h3>
                            <div className="flex max-w-full overflow-auto">
                                {proposal.attachments.length ? proposal.attachments.map((attachment, index) => {
                                    <img key={index} className='h-full max-w-[300px] object-cover' src={attachment.url} alt={`Attachment[${index}]`} />
                                }) :
                                    <p className="text-red-500">No attachments found</p>
                                }
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section-wrapper">
                    <h2 className="section-header">Routings</h2>
                    <div className="mt-3">
                        {transaction.routingSlips.length > 0 ?
                            <div className="grid lg:grid-cols-2">
                                {transaction.routingSlips.map((routing, index) => (
                                    <dl key={index}>
                                        <dt>Doc TIN</dt>
                                        <dd>{routing.docTin}</dd>
                                        <dt>From</dt>
                                        <dd>{routing.fromUser.fullName}</dd>
                                        {/* <dt>Action</dt> */}
                                        <dt>Endorsed to</dt>
                                        <dd>{routing.endorsedTo}</dd>
                                    </dl>
                                ))}
                            </div>
                            :
                            <span className="text-gray-500">No routings</span>
                        }
                    </div>
                </section>
                <section className="section-wrapper">
                    <div className="flex justify-between">
                        <div className="inline-flex gap-1.5">
                            <dt>Received by</dt>
                            <dd>{transaction.receivedBy.fullName}</dd>
                        </div>
                        <span className="text-sm">{transaction.created_at}</span>
                    </div>
                </section>
            </div>
        </Layout>
    )
}
