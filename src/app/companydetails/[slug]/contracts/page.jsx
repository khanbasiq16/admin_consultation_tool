import SuperAdminlayout from "@/app/components/Superadmin/SuperAdminlayout";
import UpperName from "@/app/utils/UpperName";
import React from "react";

const page = () => {
  return (
    <>
      <SuperAdminlayout>
        <section className="w-full">
          <UpperName path={"Contracts"} />

        </section>
      </SuperAdminlayout>
    </>
  );
};

export default page;
