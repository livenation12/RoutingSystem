import { createContext, useReducer } from 'react';

// Initial state for the transactions
const initialState = {
          routing: null
};

// Reducer function to handle actions
const userRoutingReducer = (state, action) => {
          switch (action.type) {
                    case 'SET_ROUTING':
                              return {
                                        ...state,
                                        routing: action.payload
                              };
                    default:
                              return state;
          }
};

// Create the context
export const UserRoutingContext = createContext();

// Provider component
export const UserRoutingProvider = ({ children }) => {
          const [state, dispatch] = useReducer(userRoutingReducer, initialState);

          return (
                    <UserRoutingContext.Provider value={[state, dispatch]}>
                              {children}
                    </UserRoutingContext.Provider>
          );
};
