"use client"
import React, { useState } from "react"

import {
  Dialog,
 
} from "@/components/ui/dialog"
import DailogTriger from "./DailogTriger"

const CompanyDashboard = () => {

  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex flex-col h-[64vh] justify-center items-center">

        <DailogTriger/>
      
    </div>
  )
}

export default CompanyDashboard
