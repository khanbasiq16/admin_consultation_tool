import React from 'react'
import Accounttrigger from './Accounttrigger'

const ManagerName = () => {
  return (
    <div className="bg-white p-6 mb-5 rounded-xl  flex justify-between items-center h-[10vh]">
      {/* Left - Company Name */}
      <div className="flex flex-col gap-0">
      <h2 className="text-lg font-semibold text-gray-700">Acount Managers</h2>
      <p className="text-gray opacity-80 text-xs">home {">"} account manager</p>
      </div>
      

      <Accounttrigger/>
     
    </div>
  )
}

export default ManagerName