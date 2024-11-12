import DarkModeToggler from '@/Components/DarkModeToggler'
import React from 'react'

export default function Preferences({ className }) {
          return (
                    <section className={`space-y-6 ${className}`}>
                              <header>
                                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                                  Preferences
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                  Change your theme base on your liking
                                        </p>
                              </header>
                              <DarkModeToggler />

                    </section>
          )
}
