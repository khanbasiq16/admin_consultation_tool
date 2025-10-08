import React from 'react'
import Invoicetrigger from './Invoicetrigger'

const SalesName = () => {
  return (
     <div className="bg-white p-6 mb-5 rounded-xl  flex justify-between items-center h-[10vh]">
      {/* Left - Company Name */}
      <div className="flex flex-col gap-0">
      <h2 className="text-lg font-semibold text-gray-700">Sales</h2>
      <p className="text-gray opacity-80 text-xs">Sales {">"} Invoice</p>
      </div>
      <Invoicetrigger/>

    </div>
  )
}

export default SalesName