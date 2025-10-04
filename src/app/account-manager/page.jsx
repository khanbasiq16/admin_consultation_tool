import React from "react";
import SuperAdminlayout from "../components/Superadmin/SuperAdminlayout";
import ManagerName from "../utils/ManagerName";

const page = () => {
  return (
    <>
      <SuperAdminlayout>
        <section className="w-full">
            <ManagerName />
            
        </section>
      </SuperAdminlayout>
    </>
  );
};

export default page;
