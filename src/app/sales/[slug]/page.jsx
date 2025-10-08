import SalesLayout from '@/app/components/sales/SalesLayout'
import AttendanceGraph from '@/app/utils/AttendanceGraph'
import BoxGridSales from '@/app/utils/BoxGridSales'
import React from 'react'

const page = () => {
  return (
    <>
    <SalesLayout>
      <section className='w-full'>
       <BoxGridSales/>
       <AttendanceGraph/>
       {/* <EmployeeChart/> */}
      </section> 
    </SalesLayout>
    </>
  )
}

export default page