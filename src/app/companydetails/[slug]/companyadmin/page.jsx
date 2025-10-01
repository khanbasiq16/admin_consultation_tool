import SuperAdminlayout from '@/app/components/Superadmin/SuperAdminlayout'
import Companyadmindashboard from '@/app/utils/Companyadmindashboard'
import UpperName from '@/app/utils/UpperName'
import React from 'react'

const page = () => {
  return (
    <>
     <SuperAdminlayout>
        <section className="w-full">
         <UpperName path={"Company Admin"} />
         <Companyadmindashboard />

        </section>
      </SuperAdminlayout>
    </>
  )
}

export default page