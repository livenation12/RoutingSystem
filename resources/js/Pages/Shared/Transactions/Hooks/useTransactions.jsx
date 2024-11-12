import { useContext } from "react";
import { TransactionsContext } from "../Contexts/TransactionsContext";
export default function useTransactions() {
          return useContext(TransactionsContext)
}