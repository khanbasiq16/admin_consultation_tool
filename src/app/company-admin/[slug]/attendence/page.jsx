"use client"
import CompanyAdminlayout from '@/app/components/companyadmin/CompanyAdminlayout'
import UpperName from '@/app/utils/UpperName'
import React from 'react'

const page = () => {
  return (
    <>
    
    <CompanyAdminlayout>
        <section className="w-full">
          <UpperName path={"Attendence"} />
         
          </section>
          </CompanyAdminlayout>
    </>
  )
}

export default page