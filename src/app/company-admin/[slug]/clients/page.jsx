"use client"
import CompanyAdminlayout from "@/app/components/companyadmin/CompanyAdminlayout";
import ClientDashboard from "@/app/utils/ClientDashboard";
import UpperName from "@/app/utils/UpperName";
import React from "react";

const page = () => {
  return (
    <>
      <CompanyAdminlayout>
        <section className="w-full">
          <UpperName path={"Client"} />
          <ClientDashboard  />
          
        </section>
      </CompanyAdminlayout>
    </>
  );
};

export default page;
