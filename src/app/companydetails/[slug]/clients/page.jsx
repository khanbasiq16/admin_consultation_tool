import SuperAdminlayout from "@/app/components/Superadmin/SuperAdminlayout";
import ClientDashboard from "@/app/utils/ClientDashboard";
import UpperName from "@/app/utils/UpperName";
import React from "react";

const page = () => {
  return (
    <>
      <SuperAdminlayout>
        <section className="w-full">
          <UpperName path={"Client"} />
          <ClientDashboard  />

        </section>
      </SuperAdminlayout>
    </>
  );
};

export default page;
