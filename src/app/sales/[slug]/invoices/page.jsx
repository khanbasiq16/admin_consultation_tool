import SalesLayout from '@/app/components/sales/SalesLayout'
import SalesName from '@/app/utils/SalesName'
import React from 'react'

const page = () => {
  return (
    <>
     <SalesLayout>
      <section className='w-full'>
        <SalesName path={"Invoice"}/>
      </section> 
    </SalesLayout>
    </>
  )
}

export default page