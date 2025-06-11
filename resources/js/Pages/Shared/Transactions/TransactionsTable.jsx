import useTransactions from "./Hooks/useTransactions";
import Pagination from "@/Components/Pagination";
import { useForm, usePage } from "@inertiajs/react";
import { Search } from "lucide-react";
import { useEffect } from "react";

//This component should be wrapped by TransactionProvider
export default function TransactionsTable({ transactions, search = '' }) {
    const [role] = usePage().props.auth.roles
    const { data: transactionData } = transactions;
    const [state, dispatch] = useTransactions();
    const { data: searchData, setData, get, processing } = useForm({
        search: search || '',
    })
    const handleSelectedTransaction = (transaction) => {
        dispatch({ type: 'SET_TRANSACTION', payload: transaction });
    };
    
    useEffect(() => {
        if (transactions.data.length > 0) {
            dispatch({ type: 'SET_TRANSACTION', payload: transactions.data[0] })
        }
    }, [state.isUpdated, role])

    const handleSearchSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        switch (role) {
            case 'receiver':
                get(route('receiver.dashboard'), { preserveState: true });
                break;
            case 'officeHead':
                get(route('office-head.dashboard'), { preserveState: true })
                break
            default:
                get(route('admin.transaction.index'), { preserveState: true });
        }
    };

    return (
        <div>
            <table className="mb-3 styled">
                <thead>
                    <tr>
                        <th>
                            <div className="flex justify-between">
                                <p className="text-start text-lg">Incomings</p>
                                <form className="w-1/2 relative" onSubmit={handleSearchSubmit}>
                                    <input
                                        className="h-8 w-full dark:text-gray-300 font-thin text-sm rounded bg-transparent"
                                        type="search"
                                        value={searchData.search}
                                        onChange={(e) => setData('search', e.target.value)}
                                        placeholder="Search..."
                                    />
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="absolute right-3 h-full  top-1/2 transform -translate-y-1/2"
                                    ><Search />
                                    </button>
                                </form>
                            </div>

                        </th>
                    </tr>
                </thead>
                <tbody>
                    {transactionData.length > 0 ? (
                        transactionData.map((transaction) => (
                            <tr
                                key={transaction.id}
                                onClick={() => handleSelectedTransaction(transaction)}
                            >
                                <td>
                                    <div
                                        className={`${!transaction.isInitialized ? 'border-l-8 border-yellow-800' : ''} hover:bg-gray-300 dark:hover:bg-gray-700 my-1 rounded p-3 ${transaction.id === state.transaction?.id
                                            ? 'bg-gray-200 dark:bg-gray-700'
                                            : ''
                                            }`}
                                    >
                                        <header className="mb-2 flex justify-between">
                                            <h4 className="font-medium">
                                                {transaction.proposal.trackingId} - {transaction.proposal.title}
                                            </h4>
                                            <span className="text-xs">{transaction.created_at}</span>
                                        </header>
                                        <p className="subtext">{transaction.proposal.source}</p>
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
