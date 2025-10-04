import React from 'react'
import SuperAdminlayout from '../components/Superadmin/SuperAdminlayout'
import UpperName from '../utils/UpperName'
import NormalEmployeeName from '../utils/NormalEmployeeName'
import NormalEmployeesdashboard from '../utils/NormalEmployeesdashboard'

const page = () => {
  return (
    <>
     <SuperAdminlayout>
 <section className='w-full'>
       <NormalEmployeeName/>
       <NormalEmployeesdashboard/>
      </section>
    </SuperAdminlayout>
    </>
  )
}

export default page