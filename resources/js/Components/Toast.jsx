// Toast.jsx or ToastContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';

const ToastContext = createContext();

export const useToast = () => {
          return useContext(ToastContext);
};

export const ToastProvider = ({ children }) => {
          const [toast, setToast] = useState({ title: '', message: '', show: false });
          const [duration, setDuration] = useState(3000);

          const showToast = (title, message, duration = 3000) => {
                    setToast({ title, message, show: true });
                    setDuration(duration);
          };

          const hideToast = () => {
                    setToast({ ...toast, show: false });
          };

          useEffect(() => {
                    if (toast.show) {
                              const timer = setTimeout(() => {
                                        hideToast();
                              }, duration);
                              return () => clearTimeout(timer);
                    }
          }, [toast.show, duration]);

          return (
                    <ToastContext.Provider value={showToast}>
                              {children}
                              <Transition
                                        show={toast.show}
                                        enter="transition-opacity duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="transition-opacity duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                              >
                                        <div className="fixed bottom-5 left-5 bg-white shadow-sm sm:rounded-lg min-w-[250px] dark:bg-gray-700 p-4 rounded">
                                                  <header>
                                                            <h2 className="font-semibold text-gray-900 dark:text-gray-100">
                                                                      {toast.title}
                                                            </h2>

                                                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                                      {toast.message}
                                                            </p>
                                                  </header>
                                        </div>
                              </Transition>
                    </ToastContext.Provider>
          );
};
