
export default function Wrapper({ children, className = '' }) {
          return (
                    <div className={`py-3 ${className}`}>
                              <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                                        <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                                                  {children}
                                        </div>
                              </div>
                    </div>
          )
}
