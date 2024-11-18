import React from 'react'
import { TransactionProvider } from './Transactions/Contexts/TransactionsContext'
import { UserRoutingProvider } from './RoutingSlip/Contexts/UserRoutingContext'

export default function MainContextWrapper({ children }) {
          return (
                    <UserRoutingProvider>
                              <TransactionProvider>
                                        {children}
                              </TransactionProvider>
                    </UserRoutingProvider>
          )
}
