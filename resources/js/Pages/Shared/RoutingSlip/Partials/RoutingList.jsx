import PrimaryButton from "@/Components/PrimaryButton"
import { Link, usePage } from "@inertiajs/react"
import { ArrowUpDown } from "lucide-react"

export default function RoutingList({ routingSlips, transactionId }) {
    if (routingSlips.length === 0) {
        return (
            <p>No routing slips yet</p>
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
                <div className='grid lg:grid-cols-2 gap-2'>
                    {routingSlips.map((routingSlip) => (
                        <div key={routingSlip.id} className='rounded-lg border p-4 hover:ring-1 relative group'>
                            <header className='flex justify-between'>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                    {routingSlip.fromUser?.fullName}
                                </h2>
                                <div className="inline-flex gap-2">
                                    {routingSlip.toProcess ? <Link href={route(processRouteBaseOnRole, routingSlip.id)}>
                                        <PrimaryButton>
                                            <ArrowUpDown />
                                        </PrimaryButton>
                                    </Link> : ''}

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
