"use client"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import DailogTriger from "./DailogTriger"
import { Dialog } from "@/components/ui/dialog"
const CompanyName = () => {
  const [open, setOpen] = useState(false)
   const [companyType, setCompanyType] = useState("")
  return (
    <div className="bg-white p-6 mb-5 rounded-xl  flex justify-between items-center h-[10vh]">
      {/* Left - Company Name */}
      <div className="flex flex-col gap-0">
      <h2 className="text-lg font-semibold text-gray-700">Companies</h2>
      <p className="text-gray opacity-80 text-xs">home/companies</p>
      </div>
      

      <DailogTriger/>
     
    </div>
  )
}
export default CompanyName