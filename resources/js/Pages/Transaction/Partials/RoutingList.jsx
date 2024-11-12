import Wrapper from "@/Components/Wrapper"
import SecondaryButton from "@/Components/SecondaryButton"
import PrimaryButton from "@/Components/PrimaryButton"
import { Link } from "@inertiajs/react"
import { Eye, PenBox } from "lucide-react"
export default function RoutingList({ routingSlips, transactionId }) {
          return (
                    <Wrapper>
                              <h2 className="text-lg mb-3 font-medium text-gray-900 dark:text-gray-100">
                                        Routing Slips
                              </h2>
                              {routingSlips.length > 0 ?
                                        <div className='grid lg:grid-cols-2 gap-2'>
                                                  {routingSlips.map((routingSlip) => (
                                                            <div key={routingSlip.id} className='border rounded-lg p-4'>
                                                                      <header className='flex justify-between'>
                                                                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                                                                          From {routingSlip.fromUser.fullName}
                                                                                </h2>
                                                                                <div className="inline-flex gap-2">
                                                                                          <Link>
                                                                                                    <PrimaryButton>
                                                                                                              <Eye />
                                                                                                    </PrimaryButton>
                                                                                          </Link>
                                                                                          <SecondaryButton><PenBox /></SecondaryButton>
                                                                                </div>
                                                                      </header>
                                                                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                                                <strong>Subject:</strong>  {routingSlip.subject}
                                                                      </p>
                                                            </div>
                                                  ))}
                                        </div>
                                        :
                                        <p>No routing slip found
                                                  <Link href={route('routing-slip.create', { transaction: transactionId })} className="ml-2">
                                                            <PrimaryButton>Create</PrimaryButton>
                                                  </Link>
                                        </p>}
                    </Wrapper>
          )
}
