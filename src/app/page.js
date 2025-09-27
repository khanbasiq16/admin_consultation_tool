import React from 'react';
import SuperAdminlayout from './components/Superadmin/SuperAdminlayout';
import BoxGridDashbaord from './utils/BoxGridDashbaord';
import RevenueGraph from './utils/RevenueGraph';
import EmployeeChart from './utils/EmployeeChart';
const page = () => {
  return (
    <SuperAdminlayout>
      <section className='w-full'>
       <BoxGridDashbaord/>
       <RevenueGraph/>
       <EmployeeChart/>
      </section>
    </SuperAdminlayout>
  );
};
export default page;