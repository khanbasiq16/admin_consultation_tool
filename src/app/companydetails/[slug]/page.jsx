import SuperAdminlayout from '@/app/components/Superadmin/SuperAdminlayout'
import OverviewBoxGrid from '@/app/utils/OverviewBoxGrid'
import OverviewTabs from '@/app/utils/OverviewTabs'
import React from 'react'

const page = () => {
  return (
    <>
    <SuperAdminlayout>

<section className='w-full'>
       <OverviewBoxGrid/>
       <OverviewTabs/>
      </section>
    </SuperAdminlayout>
    
    </>
  )
}

export default page