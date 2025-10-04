import React from 'react'
import Expensetrigger from './Expensetrigger'

const ExpenseName = () => {
  return (
   <div className="bg-white p-6 mb-5 rounded-xl  flex justify-between items-center h-[10vh]">
      {/* Left - Company Name */}
      <div className="flex flex-col gap-0">
      <h2 className="text-lg font-semibold text-gray-700">Expense</h2>
      <p className="text-gray opacity-80 text-xs">home {">"} Expense</p>
      </div>
      

      <Expensetrigger/>
     
    </div>
  )
}

export default ExpenseName