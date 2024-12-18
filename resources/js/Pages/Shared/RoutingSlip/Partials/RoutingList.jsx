import PrimaryButton from "@/Components/PrimaryButton"
import SecondaryButton from "@/Components/SecondaryButton"
import { Link, usePage } from "@inertiajs/react"
import { ArrowUpDown, Ellipsis, RefreshCw } from "lucide-react"

export default function RoutingList({ routingSlips, transactionId }) {
    if (routingSlips.length === 0) {
        return (
            <p className="text">No routing slips yet</p>
        )
    }
    const [role] = usePage().props.auth.roles
    const processRouteBaseOnRole = role === 'deptHead' ? 'department-head.routing-slip.form' : 'office-head.routing-slip.form'
    return (
        <>
            <h2 className="text-lg mb-3 font-medium text-gray-900 dark:text-gray-100">
                Routing Slips
            </h2>
            {routingSlips.length > 0 &&
                <div className='grid gap-2'>
                    {routingSlips.map((routingSlip) => (
                        <div key={routingSlip.id} className='rounded-lg border p-4 hover:ring-1 relative group'>
                            <header className='flex justify-between'>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                    {routingSlip.fromUser?.fullName}
                                </h2>
                                <div className="inline-flex gap-2">
                                    {routingSlip.toProcess && role === 'officeHead' ?
                                        <Link href={route('office-head.routing-slip.revert.form', routingSlip.id)}>
                                            <PrimaryButton>
                                                <RefreshCw className="me-1.5" /> Revert
                                            </PrimaryButton>
                                        </Link>
                                        : null
                                    }
                                    {
                                        routingSlip.toProcess ?
                                            <>
                                                <Link href={route(processRouteBaseOnRole, routingSlip.id)}>
                                                    <PrimaryButton>
                                                        <ArrowUpDown />
                                                    </PrimaryButton>
                                                </Link>
                                            </>
                                            : null
                                    }

                                    <Link href={route('routing.show', routingSlip.id)}>
                                        <SecondaryButton>
                                            <Ellipsis />
                                        </SecondaryButton>
                                    </Link>
                                </div>
                            </header>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                {routingSlip.docTin}
                            </p>
                        </div>
                    ))}
                </div>
            }
        </>
    )
}
