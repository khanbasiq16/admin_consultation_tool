import React from "react";
import SuperAdminlayout from "../components/Superadmin/SuperAdminlayout";
import ManagerName from "../utils/ManagerName";
import ManagerDashboard from "../utils/ManagerDashboard";

const page = () => {
  return (
    <>
      <SuperAdminlayout>
        <section className="w-full">
            <ManagerName />
             <ManagerDashboard />
        </section>
      </SuperAdminlayout>
    </>
  );
};

export default page;
