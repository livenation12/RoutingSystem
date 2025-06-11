import { createContext, useReducer } from 'react';

// Initial state for the transactions
const initialState = {
          transaction: null,
          isUpdated: false
};

// Reducer function to handle actions
const transactionReducer = (state, action) => {
          switch (action.type) {
                    case 'SET_TRANSACTION':
                              return {
                                        ...state,
                                        transaction: action.payload,
                              };

                    case 'UPDATE_TRANSACTION':
                              return {
                                        ...state,
                                        isUpdated: !state.isUpdated
                              }
                    case 'RESET_TRANSACTION':
                         return {
                                   ...state,
                                   transaction: null
                         }
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
