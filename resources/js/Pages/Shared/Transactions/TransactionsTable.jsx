import { useEffect } from "react";
import useTransactions from "./Hooks/useTransactions";
import Pagination from "@/Components/Pagination";


//This component should be wrapped by TransactionProvider
export default function ProposalsTable({ transactions }) {
          const { data } = transactions;
          const [state, dispatch] = useTransactions();

          const handleSelectedTransaction = (transaction) => {
                    dispatch({ type: 'SET_VIEWING_TRANSACTION', payload: transaction });
          };

          //setting the first transaction as default
          useEffect(() => {
                    if (!state.viewingTransaction && data.length > 0) {
                              dispatch({ type: 'SET_VIEWING_TRANSACTION', payload: data[0] });
                    }
          }, [state.viewingTransaction, dispatch]);

          return (
                    <div>
                              <table>
                                        <thead>
                                                  <tr>
                                                            <th className="text-start text-lg">Incomings</th>
                                                  </tr>
                                        </thead>
                                        <tbody>
                                                  {data.length > 0 ? (
                                                            data.map((transaction) => (
                                                                      <tr
                                                                                key={transaction.id}
                                                                                onClick={() => handleSelectedTransaction(transaction)}
                                                                      >
                                                                                <td>
                                                                                          <div
                                                                                                    className={`hover:bg-gray-700 my-1 rounded p-3 ${transaction.id === state.viewingTransaction?.id
                                                                                                              ? 'bg-gray-700'
                                                                                                              : ''
                                                                                                              }`}
                                                                                          >
                                                                                                    <header className="mb-2 flex justify-between">
                                                                                                              <h4 className="font-medium">
                                                                                                                        {transaction.proposal.trackingId} - {transaction.proposal.title}
                                                                                                              </h4>
                                                                                                              <span className="text-xs">{transaction.created_at}</span>
                                                                                                    </header>
                                                                                                    <p className="text-sm text-gray-400">{transaction.proposal.source}</p>
                                                                                          </div>
                                                                                </td>
                                                                      </tr>
                                                            ))
                                                  ) : (
                                                            <tr>
                                                                      <td colSpan={5} className="text-center py-2">
                                                                                No transactions found
                                                                      </td>
                                                            </tr>
                                                  )}
                                        </tbody>
                              </table>
                              <div className="absolute bottom-2 right-2">
                                        <Pagination links={transactions.meta.links} />
                              </div>
                    </div>
          );
}
