import SalesLayout from '@/app/components/sales/SalesLayout';
import AttendanceChart from '@/app/utils/AttendanceChart';
import React from 'react';
const page = () => {
  return (
    <SalesLayout>
      <section className='w-full'>
       <AttendanceChart/>
      </section>
    </SalesLayout>
  );
};
export default page;