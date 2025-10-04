"use client"
import CompanyAdminlayout from '@/app/components/companyadmin/CompanyAdminlayout'
import EmployeeDashboard from '@/app/utils/EmployeeDashboard'
import UpperName from '@/app/utils/UpperName'
import React from 'react'

const page = () => {
  return (
    <>

    <CompanyAdminlayout>

      <section className="w-full">
          <UpperName path={"Employees"} />
          <EmployeeDashboard />
          
        </section>
    </CompanyAdminlayout>
    </>
  )
}

export default page