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
import { useParams } from "next/navigation"
import EmployeeTriger from "./EmployeeTriger"

const UpperName = ({path}) => {
  const [open, setOpen] = useState(false)
   const [companyType, setCompanyType] = useState("")
   const {slug} = useParams()
  return (
    <div className="bg-white p-6 mb-5 rounded-xl  flex justify-between items-center h-[10vh]">
      {/* Left - Company Name */}
      <div className="flex flex-col gap-0">
      <h2 className="text-lg font-semibold text-gray-700">{path}</h2>
      <p className="text-gray opacity-80 text-xs">home {">"} {slug} {">"} {path.toLowerCase()}</p>
      </div>
      

      {path="Employee"? <EmployeeTriger/> : ""}
     
    </div>
  )
}
export default UpperName