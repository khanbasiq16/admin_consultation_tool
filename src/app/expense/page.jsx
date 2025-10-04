import React from "react";
import SuperAdminlayout from "../components/Superadmin/SuperAdminlayout";
import ExpenseName from "../utils/ExpenseName";
import ExpenseDashboard from "../utils/ExpenseDashboard";

const page = () => {
  return (
    <>
      <SuperAdminlayout>
        <section className="w-full">
          <ExpenseName />
          <ExpenseDashboard />
        </section>
      </SuperAdminlayout>
    </>
  );
};

export default page;
