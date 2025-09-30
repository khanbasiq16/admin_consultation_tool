import SuperAdminlayout from "@/app/components/Superadmin/SuperAdminlayout";
import EmployeeDashboard from "@/app/utils/EmployeeDashboard";
import UpperName from "@/app/utils/UpperName";
import React from "react";

const page = () => {
  return (
    <>
      <SuperAdminlayout>
        <section className="w-full">
          <UpperName path={"Employees"} />
          <EmployeeDashboard />
          
        </section>
      </SuperAdminlayout>
    </>
  );
};

export default page;
