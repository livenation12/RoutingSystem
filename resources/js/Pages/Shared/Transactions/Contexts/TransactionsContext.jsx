import { createContext, useReducer } from 'react';

// Initial state for the transactions
const initialState = {
          viewingTransaction: null
};

// Reducer function to handle actions
const transactionReducer = (state, action) => {
          switch (action.type) {
                    case 'SET_VIEWING_TRANSACTION':
                              return {
                                        ...state,
                                        viewingTransaction: action.payload
                              };
                    default:
                              return state;
          }
};

// Create the context
export const TransactionsContext = createContext();

// Provider component
export const TransactionProvider = ({ children }) => {
          const [state, dispatch] = useReducer(transactionReducer, initialState);


          return (
                    <TransactionsContext.Provider value={[state, dispatch]}>
                              {children}
                    </TransactionsContext.Provider>
          );
};
