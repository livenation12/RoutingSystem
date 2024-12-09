
import Layout from '@/Layouts/Layout';
import { Head } from '@inertiajs/react'
import React from 'react'
import RoutingsTable from './Partials/RoutingsTable';

export default function Index({ routings, search, sortColumn, sortDirection }) {
    console.log(routings);

    return (
        <Layout>
            <Head title='Routings' />
            <div className="content-wrapper">
                <div className="section-wrapper">
                    <RoutingsTable
                        routings={routings}
                        search={search}
                        sortColumn={sortColumn}
                        sortDirection={sortDirection} />
                </div>
            </div>
        </Layout>
    )
}
