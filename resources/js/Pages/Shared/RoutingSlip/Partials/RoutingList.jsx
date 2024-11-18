import { Link } from "@inertiajs/react"

export default function RoutingList({ routingSlips, transactionId }) {
    if (routingSlips.length === 0) {
        return (
            <p>No routing slips yet</p>
        )
    }
    return (
        <>
            <h2 className="text-lg mb-3 font-medium text-gray-900 dark:text-gray-100">
                Routing Slips
            </h2>
            {routingSlips.length > 0 &&
                <div className='grid lg:grid-cols-2 gap-2'>
                    {routingSlips.map((routingSlip) => (
                        <Link key={routingSlip.id} className='rounded-lg p-4 hover:bg-gray-700 relative group'>
                            <span className="text-xs hidden group-hover:block absolute top-2 text-gray-400 right-2">Details</span>
                            <header className='flex justify-between'>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                    {routingSlip.fromUser?.fullName}
                                </h2>
                                <div className="inline-flex gap-2">
                                </div>
                            </header>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                {routingSlip.docTin}
                            </p>

                        </Link>
                    ))}
                </div>
            }
        </>
    )
}
