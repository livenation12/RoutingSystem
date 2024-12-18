import SecondaryButton from "@/Components/SecondaryButton";
import Layout from "@/Layouts/Layout";
import { Head, Link } from "@inertiajs/react";
import TransactionRoutings from "./Partials/TransactionRoutings";
import TransactionProposal from "./Partials/TransactionProposal";


export default function TransactionFullDetails({ transaction }) {
    const { proposal, routingSlips } = transaction
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
                </section>
            </div>
        </Layout>
    )
}
