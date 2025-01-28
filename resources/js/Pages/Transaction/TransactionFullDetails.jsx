import SecondaryButton from "@/Components/SecondaryButton";
import Layout from "@/Layouts/Layout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import TransactionRoutings from "./Partials/TransactionRoutings";
import TransactionProposal from "./Partials/TransactionProposal";
import PrimaryButton from "@/Components/PrimaryButton";


export default function TransactionFullDetails({ transaction }) {
    const { proposal, routingSlips } = transaction
    const roles = usePage().props.auth.roles;

    const handleMarkAs = (status) => {
        router.patch(route('receiver.transaction.mark-status', transaction.id), {
            status: status
        }, {
            onSuccess: () => {
                toast('Updated', 'Status updated to ' + status + ' successfully');
            },
            preserveScroll: true
        });
    }
    return (
        <Layout header={
            <div className="flex justify-between">
                <h1 className="main-header">Transaction</h1>
                <div className="flex gap-2">
                    <Link onClick={() => window.history.back()}>
                        <SecondaryButton>Back</SecondaryButton>
                    </Link>
                </div>
            </div>
        }>
            <Head title="Transaction Details" />

            <div className="content-wrapper">
                {(transaction.accomplishmentDate && roles.includes('receiver') && !transaction.completionDate) &&
                    <div className="section-wrapper">
                        <h3 className="section-header">Mark as</h3>
                        <div className="flex gap-3 mt-3">
                            <PrimaryButton onClick={() => handleMarkAs('Completed')}>Completed</PrimaryButton>
                            <SecondaryButton onClick={() => handleMarkAs('Incomplete')}>Incomplete</SecondaryButton>
                        </div>
                    </div>
                }
                {
                    transaction.accomplishmentDate &&
                    <section className="section-wrapper space-y-2">
                        <div className="flex justify-between">
                            <p>Date of accomplishment</p>
                            {transaction.accomplishmentDate}
                        </div>
                        {transaction.completionDate &&
                            <>
                                <div className="flex justify-between">
                                    <p>Date of completion</p>
                                    {transaction.completionDate}
                                </div>
                                <div className="flex justify-between">
                                    <p>Mark completed by</p>
                                    {transaction.completedBy.fullName}
                                </div>
                            </>
                        }
                    </section>
                }
                <section className="section-wrapper">
                    <h2 className="section-header">Proposal</h2>
                    <TransactionProposal proposal={proposal} />
                </section>
                <section className="section-wrapper">
                    <h2 className="section-header">Routings</h2>
                    <div className="mt-3">
                        <TransactionRoutings routingSlips={routingSlips} />
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
                    {/* <div className="flex justify-between">
                        <div className="inline-flex gap-1.5">
                            <dt>Completed by</dt>
                            <dd>{transaction.completedBy?.fullName}</dd>
                        </div>
                    </div> */}
                </section>
            </div>
        </Layout >
    )
}
