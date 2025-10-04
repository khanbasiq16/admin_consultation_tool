"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import toast from "react-hot-toast";

import { Eye, EyeOff } from "lucide-react";

const NormalEmployeetrigger = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  
 
  const validatePassword = (value) => {
    if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    } else if (!/\d/.test(value)) {
      setPasswordError("Password must contain at least one number");
    } else {
      setPasswordError("");
    }
  };

  // ✅ Convert time from 24-hour format to 12-hour format with AM/PM
  const convertTo12HourFormat = (time) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHour = hours % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  const formHandler = async (e) => {
    e.preventDefault();
    const passwordValue = e.target.employeepassword.value;
    if (!passwordValue || passwordError) return;

    setLoading(true);

    try {
      const formData = new FormData();

      
      formData.append("employeeName", e.target.employeeName.value);
      formData.append("employeeAddress", e.target.employeeAddress.value);
      formData.append("employeeemail", e.target.employeeemail.value);
      formData.append("employeepassword", passwordValue);
      formData.append("employeePhone", e.target.employeePhone.value);
      formData.append("employeeCNIC", e.target.employeeCNIC.value);
      formData.append("employeeSalary", e.target.employeeSalary.value);

      // ✅ Auto Convert to 12-hour Format
      formData.append("checkInTime", convertTo12HourFormat(e.target.checkInTime.value));
      formData.append("graceTime", convertTo12HourFormat(e.target.graceTime.value));
      formData.append("checkOutTime", convertTo12HourFormat(e.target.checkOutTime.value));

      formData.append("totalWorkingHours", e.target.totalWorkingHours?.value || "");
      formData.append("dateOfJoining", e.target.dateOfJoining.value);

      const res = await axios.post("/api/create-office-employee", formData, {
        headers: { "Content-Type": "application/json" },
      });

      const data = res.data;

      if (data.success) {
        toast.success("Employee Created Successfully");
        e.target.reset();
        setOpen(false);
      } else {
        toast.error(data.error || "Failed to create employee");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error creating employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#5965AB] text-white font-semibold rounded-md px-4 py-2">
          + Create Office Employee
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Create New Employee</DialogTitle>
         
        </DialogHeader>

        <form
          onSubmit={formHandler}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 max-h-[80vh] overflow-y-auto p-2"
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="employeeName">Employee Name</Label>
              <Input id="employeeName" name="employeeName" placeholder="Enter employee name" required />
            </div>

            <div>
              <Label htmlFor="employeeemail">Employee Email</Label>
              <Input id="employeeemail" name="employeeemail" type="email" placeholder="Enter email" required />
            </div>

            <div className="flex flex-col w-full max-w-sm mx-auto">
              <Label htmlFor="employeepassword">Employee Password</Label>
              <div className="relative">
                <Input
                  id="employeepassword"
                  name="employeepassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  onChange={(e) => validatePassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 pr-12"
                />
                <span
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>
              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </div>

            <div>
              <Label htmlFor="employeeAddress">Address</Label>
              <Input id="employeeAddress" name="employeeAddress" placeholder="Enter address" />
            </div>

            <div>
              <Label htmlFor="employeePhone">Phone Number</Label>
              <Input id="employeePhone" name="employeePhone" placeholder="Enter phone number" />
            </div>

            <div>
              <Label htmlFor="employeeCNIC">CNIC Number</Label>
              <Input id="employeeCNIC" name="employeeCNIC" placeholder="Enter CNIC number" />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="employeeSalary">Salary</Label>
              <Input id="employeeSalary" name="employeeSalary" placeholder="Enter salary" />
            </div>

            {/* ✅ Updated Time Inputs (No AM/PM Dropdowns) */}
            <TimeInput label="Check In Time" name="checkInTime" />
            <TimeInput label="Grace Time" name="graceTime" />
            <TimeInput label="Check Out Time" name="checkOutTime" />

            <div>
              <Label htmlFor="totalWorkingHours">Total Working Hours</Label>
              <Input id="totalWorkingHours" name="totalWorkingHours" placeholder="Enter total working hours" />
            </div>

            <DateInput label="Date of Joining" name="dateOfJoining" />
          </div>

          <DialogFooter className="col-span-2 flex justify-end mt-2">
            <Button
              type="submit"
              className="bg-[#5965AB] text-white font-semibold px-6 py-2"
              disabled={loading || !!passwordError}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NormalEmployeetrigger;

// ✅ Optimized Time Input (No AM/PM dropdown)
const TimeInput = ({ label, name }) => (
  <div className="flex flex-col w-full max-w-sm mx-auto">
    <Label className="mb-2 text-sm font-semibold">{label}</Label>
    <Input id={name} name={name} type="time" className="w-full px-4 py-3" />
  </div>
);

const DateInput = ({ label, name }) => (
  <div className="flex flex-col w-full max-w-sm mx-auto mt-4">
    <Label className="mb-2 text-sm font-semibold">{label}</Label>
    <Input id={name} name={name} type="date" className="w-full px-4 py-3" />
  </div>
);
