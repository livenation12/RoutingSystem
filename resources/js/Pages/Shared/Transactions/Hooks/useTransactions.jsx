import { useContext } from "react";
import { TransactionsContext } from "../Contexts/TransactionsContext";
export default function useTransactions() {
    const context = useContext(TransactionsContext)
    if (!context) {
        throw new Error('useTransactions must be used within a TransactionProvider');
    }
    return context
}