import Modal from '@/Components/Modal'
import SecondaryButton from '@/Components/SecondaryButton'
import { Button } from '@headlessui/react'
import { X } from 'lucide-react'
import React from 'react'

export default function UnreadNotif({unreadNotifs, isUnreadNotifsOpen, handleNotifClose}) {
     return (
          <Modal show={isUnreadNotifsOpen}>
               <Button className='absolute top-3 right-3' onClick={handleNotifClose}><X /></Button>
               <div className='section-wrapper pb-0'>
                    <h3 className='section-header'>Unread Notifications</h3>
                    <ul className='mt-5 space-y-2'>
                         {unreadNotifs.length > 0 ? (
                              unreadNotifs.map((notification, index) => (
                                   <li className='text-sm rounded hover p-2' key={notification.id}>
                                        {index + 1}.
                                        <span className='ms-1'>
                                             {notification.data.message}
                                        </span>
                                   </li>
                              ))
                         )
                              :
                              <li className='text-sm text-gray-500'>No unread notifications</li>
                         }
                    </ul>
                    <div className='flex justify-end py-2'>
                         <div>
                              <SecondaryButton onClick={handleNotifClose}>Close</SecondaryButton>
                         </div>
                    </div>
               </div>
          </Modal>
     )
}
