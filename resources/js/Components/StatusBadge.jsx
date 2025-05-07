import React from 'react'

export default function StatusBadge({ status }) {

     switch (status) {
          case "Pending":
               return <span className='rounded-md font-semibold p-1.5 bg-yellow-600 text-xs'>{status}</span>
          case "Endorsed": 
               return <span className='rounded-md font-semibold p-1.5 bg-gray-600 text-xs'>{status}</span>
          case "Completed": 
               return <span className='rounded-md font-semibold p-1.5 bg-green-600 text-xs'>{status}</span>
          case "Accomplished":
               return <span className='rounded-md font-semibold p-1.5 bg-blue-600 text-xs'>{status}</span>
          default:
               return <span className='rounded-md font-semibold p-1.5 bg-white-600 text-black text-xs'>{status}</span>
     }
}
