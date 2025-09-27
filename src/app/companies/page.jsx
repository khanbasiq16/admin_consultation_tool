import React from 'react'
import SuperAdminlayout from '../components/Superadmin/SuperAdminlayout'
import BoxGridDashbaord from '../utils/BoxGridDashbaord'
import RevenueGraph from '../utils/RevenueGraph'
import EmployeeChart from '../utils/EmployeeChart'
import CompanyDashboard from '../utils/CompanyDashboard'
import CompanyName from '../utils/CompanyName'
const page = () => {
  return (
    <>
    <SuperAdminlayout>
 <section className='w-full'>
       <CompanyName/>
       <CompanyDashboard/>
      </section>
    </SuperAdminlayout>
    </>
  )
}
export default page