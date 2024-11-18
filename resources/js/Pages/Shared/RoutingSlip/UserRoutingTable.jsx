import { useEffect } from "react";
import Pagination from "@/Components/Pagination";
import useUserRouting from "./Hooks/useUserRouting";
import useTransactions from "../Transactions/Hooks/useTransactions";


//This component should be wrapped by routingProvider
export default function UserRoutingTable({ routings }) {
          const { data } = routings;
          const [state, dispatch] = useUserRouting();
          const [transactionState, transactionDispatch] = useTransactions();
          const handleSelectedRouting = (routing) => {
                    dispatch({ type: 'SET_ROUTING', payload: routing });
          };

          //setting the first routing as default
          useEffect(() => {
                    if (!state.routing && data.length > 0) {
                              dispatch({ type: 'SET_ROUTING', payload: data[0] });
                    }
          }, [state.routing, dispatch]);

          useEffect(() => {
                    if (!transactionState.viewingTransaction && data.length > 0) {
                              dispatch({ type: 'SET_VIEWING_TRANSACTION', payload: data[0] });
                    }
          }, [transactionState.viewingTransaction, transactionDispatch]);

          return (
                    <div className="min-h-[400px] max-h-[500px] overflow-y-auto flex flex-col justify-between">
                              <table>
                                        <thead>
                                                  <tr>
                                                            <th className="text-start text-lg">Routings</th>
                                                  </tr>
                                        </thead>
                                        <tbody>
                                                  {data.length > 0 ? (
                                                            data.map((routing) => (
                                                                      <tr
                                                                                key={routing.id}
                                                                                onClick={() => handleSelectedRouting(routing)}
                                                                      >
                                                                                <td>
                                                                                          <div
                                                                                                    className={`hover:bg-gray-700 my-1 rounded p-3 ${routing.id === state.viewingrouting?.id
                                                                                                              ? 'bg-gray-700'
                                                                                                              : ''
                                                                                                              }`}
                                                                                          >
                                                                                                    <header className="mb-2 flex justify-between">
                                                                                                              <h4 className="font-medium">
                                                                                                                        {routing.docTin}
                                                                                                              </h4>
                                                                                                              <span className="text-xs">{routing.created_at}</span>
                                                                                                    </header>
                                                                                                    {/* // <p className="text-sm text-gray-400">{routing.proposal.source}</p> */}
                                                                                          </div>
                                                                                </td>
                                                                      </tr>
                                                            ))
                                                  ) : (
                                                            <tr>
                                                                      <td colSpan={5} className="text-center py-2">
                                                                                No routings found
                                                                      </td>
                                                            </tr>
                                                  )}
                                        </tbody>
                              </table>
                              <div className="self-end">
                                        <Pagination links={routings.meta.links} />
                              </div>
                    </div>
          );
}
