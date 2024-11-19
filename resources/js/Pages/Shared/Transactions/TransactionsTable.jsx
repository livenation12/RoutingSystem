import useTransactions from "./Hooks/useTransactions";
import Pagination from "@/Components/Pagination";
import { useEffect } from "react";

//This component should be wrapped by TransactionProvider
export default function TransactionsTable({ transactions }) {
    const { data } = transactions;
    const [state, dispatch] = useTransactions();

    const handleSelectedTransaction = (transaction) => {
        dispatch({ type: 'SET_TRANSACTION', payload: transaction });
    };

    useEffect(() => {
        if (transactions.data.length > 0) {
            dispatch({ type: 'SET_TRANSACTION', payload: transactions.data[0] })
        }
    }, [state.isUpdated])

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
                                        className={`${!transaction.isInitialized ? 'border-l-8 border-yellow-800' : ''} hover:bg-gray-700 my-1 rounded p-3 ${transaction.id === state.transaction?.id
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
            <div className="absolute bottom-3 right-2">
                <Pagination links={transactions.meta.links} />
            </div>
        </div>
    );
}
