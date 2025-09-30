// "use client";
// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useParams } from "next/navigation";

// const EmployeeTrigger = () => {
//   const [loading, setLoading] = useState(false);
//   const [open, setOpen] = useState(false);

//   const { slug } = useParams();
//   const capitalizedCompanyName = slug
//     ? slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
//     : "";

//  const formHandler = async (e) => {
//   e.preventDefault();
//   setLoading(true);

//   try {
//     const formData = new FormData();

//     // Append all fields
//     formData.append("companyName", slug);
//     formData.append("employeeName", e.target.employeeName.value);
//     formData.append("employeeAddress", e.target.employeeAddress.value);
//     formData.append("employeeemail", e.target.employeeemail.value);
//     formData.append("employeepassword", e.target.employeeemail.value);
//     formData.append("employeePhone", e.target.employeePhone.value);
//     formData.append("employeeCNIC", e.target.employeeCNIC.value);
//     formData.append("employeeSalary", e.target.employeeSalary.value);
//     formData.append("checkInTime", e.target.checkInTime.value);
//     formData.append("graceTime", e.target.graceTime.value); 
//     formData.append("checkOutTime", e.target.checkOutTime.value);
//     formData.append("totalWorkingHours", e.target.totalWorkingHours?.value || ""); 
//     formData.append("dateOfJoining", e.target.dateOfJoining.value);

//     const res = await axios.post("/api/create-employee", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });

//     const data = res.data;

//     if (data.success) {
//       toast.success("Employee Created Successfully");
//       e.target.reset();
//       setOpen(false);
//     } else {
//       toast.error(data.error || "Failed to create employee");
//     }
//   } catch (error) {
//     console.error(error);
//     toast.error("Error creating employee");
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button className="bg-[#5965AB] text-white font-semibold rounded-md px-4 py-2">
//           + Create Employee
//         </Button>
//       </DialogTrigger>

//       <DialogContent className="sm:max-w-[700px]">
//         <DialogHeader>
//           <DialogTitle>Create New Employee</DialogTitle>
//           {capitalizedCompanyName && (
//             <p className="text-sm text-gray-500 mt-1">
//               Company: <span className="font-semibold">{capitalizedCompanyName}</span>
//             </p>
//           )}
//         </DialogHeader>

//         <form
//           onSubmit={formHandler}
//           className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 max-h-[80vh] overflow-y-auto p-2"
//         >
//           {/* Left Column */}
//           <div className="space-y-4">
//             <div>
//               <Label htmlFor="employeeName">Employee Name</Label>
//               <Input id="employeeName" name="employeeName" placeholder="Enter employee name" required />
//             </div>
//             <div>
//               <Label htmlFor="employeeName">Employee Email</Label>
//               <Input id="employeeName" name="employeeemail" type="email" placeholder="Enter employee name" required />
//             </div>
//             <div>
//               <Label htmlFor="employeeName">Employee Password</Label>
//               <Input id="employeeName" name="employeepassword" type="password" placeholder="Enter employee name" required />
//             </div>

//             <div>
//               <Label htmlFor="employeeAddress">Address</Label>
//               <Input id="employeeAddress" name="employeeAddress" placeholder="Enter address" />
//             </div>

//             <div>
//               <Label htmlFor="employeePhone">Phone Number</Label>
//               <Input id="employeePhone" name="employeePhone" placeholder="Enter phone number" />
//             </div>

//             <div>
//               <Label htmlFor="employeeCNIC">CNIC Number</Label>
//               <Input id="employeeCNIC" name="employeeCNIC" placeholder="Enter CNIC number" />
//             </div>
           
//           </div>

//           {/* Right Column */}
//           <div className="space-y-4">

//        <div className="flex flex-col w-full max-w-sm mx-auto">
//          <div>
//               <Label htmlFor="employeeSalary">Salary</Label>
//               <Input id="employeeSalary" name="employeeSalary" placeholder="Enter salary" />
//             </div>
//   <Label
//     htmlFor="checkInTime"
//     className="mb-2 text-sm font-semibold text-gray-800"
//   >
//     Check In Time
//   </Label>
//   <div className="relative">
//     <Input
//       id="checkInTime"
//       name="checkInTime"
//       type="time"
//       className="w-full px-4 py-3 pr-12 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//       placeholder="Select check-in time"
//     />
//     {/* Optional clock icon */}
//     <span className="absolute inset-y-0 right-3 flex items-center text-gray-400 pointer-events-none">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="h-5 w-5"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth="2"
//           d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//         />
//       </svg>
//     </span>
//   </div>
// </div>


//           <div className="flex flex-col w-full max-w-sm mx-auto mt-4">
//   <Label
//     htmlFor="graceTime"
//     className="mb-2 text-sm font-semibold text-gray-800"
//   >
//     Grace Time
//   </Label>
//   <div className="relative">
//     <Input
//       id="graceTime"
//       name="graceTime"
//       type="time"
//       className="w-full px-4 py-3 pr-12 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//       placeholder="Enter grace time"
//     />
//     {/* Optional clock icon */}
//     <span className="absolute inset-y-0 right-3 flex items-center text-gray-400 pointer-events-none">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="h-5 w-5"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth="2"
//           d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//         />
//       </svg>
//     </span>
//   </div>
// </div>
// <div className="flex flex-col w-full max-w-sm mx-auto mt-4">
//   <Label
//     htmlFor="checkOutTime"
//     className="mb-2 text-sm font-semibold text-gray-800"
//   >
//     Check Out Time
//   </Label>
//   <div className="relative">
//     <Input
//       id="checkOutTime"
//       name="checkOutTime"
//       type="time"
//       className="w-full px-4 py-3 pr-12 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//       placeholder="Enter check-out time"
//     />
//     {/* Optional clock icon */}
//     <span className="absolute inset-y-0 right-3 flex items-center text-gray-400 pointer-events-none">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="h-5 w-5"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth="2"
//           d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//         />
//       </svg>
//     </span>
//   </div>
// </div>


            
//             <div>
//               <Label htmlFor="checkInTime">Total Working Hours</Label>
//               <Input id="checkInTime" name="checkInTime" placeholder="Enter check-in time" />
//             </div>


//           <div className="flex flex-col w-full max-w-sm mx-auto mt-4">
//   <Label
//     htmlFor="dateOfJoining"
//     className="mb-2 text-sm font-semibold text-gray-800"
//   >
//     Date of Joining
//   </Label>
//   <div className="relative">
//     <Input
//       id="dateOfJoining"
//       name="dateOfJoining"
//       type="date"
//       className="w-full px-4 py-3 pr-12 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//       placeholder="Select date of joining"
//     />
//     {/* Optional calendar icon */}
//     <span className="absolute inset-y-0 right-3 flex items-center text-gray-400 pointer-events-none">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="h-5 w-5"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth="2"
//           d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//         />
//       </svg>
//     </span>
//   </div>
// </div>

//           </div>

//           {/* Submit Button */}
//           <DialogFooter className="col-span-2 flex justify-end mt-2">
//             <Button
//               type="submit"
//               className="bg-[#5965AB] text-white font-semibold rounded-md px-6 py-2"
//               disabled={loading}
//             >
//               {loading ? "Saving..." : "Save"}
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default EmployeeTrigger;

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
import { useParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

const EmployeeTrigger = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const { slug } = useParams();
  const capitalizedCompanyName = slug
    ? slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
    : "";

  const validatePassword = (value) => {
    if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    } else if (!/\d/.test(value)) {
      setPasswordError("Password must contain at least one number");
    } else {
      setPasswordError("");
    }
  };

  const formHandler = async (e) => {
    e.preventDefault();
    const passwordValue = e.target.employeepassword.value;
    if (!passwordValue || passwordError) return; 

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("companyName", slug);
      formData.append("employeeName", e.target.employeeName.value);
      formData.append("employeeAddress", e.target.employeeAddress.value);
      formData.append("employeeemail", e.target.employeeemail.value);
      formData.append("employeepassword", passwordValue);
      formData.append("employeePhone", e.target.employeePhone.value);
      formData.append("employeeCNIC", e.target.employeeCNIC.value);
      formData.append("employeeSalary", e.target.employeeSalary.value);
      formData.append("checkInTime", e.target.checkInTime.value);
      formData.append("graceTime", e.target.graceTime.value);
      formData.append("checkOutTime", e.target.checkOutTime.value);
      formData.append("totalWorkingHours", e.target.totalWorkingHours?.value || "");
      formData.append("dateOfJoining", e.target.dateOfJoining.value);

      const res = await axios.post("/api/create-employee", formData, {
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
          + Create Employee
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Create New Employee</DialogTitle>
          {capitalizedCompanyName && (
            <p className="text-sm text-gray-500 mt-1">
              Company: <span className="font-semibold">{capitalizedCompanyName}</span>
            </p>
          )}
        </DialogHeader>

        <form
          onSubmit={formHandler}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 max-h-[80vh] overflow-y-auto p-2"
        >
          {/* Left Column */}
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
                  className="w-full px-4 py-3 pr-12 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
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

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="employeeSalary">Salary</Label>
              <Input id="employeeSalary" name="employeeSalary" placeholder="Enter salary" />
            </div>

            {/* Check-in Time */}
            <TimeInput label="Check In Time" name="checkInTime" />
            <TimeInput label="Grace Time" name="graceTime" />
            <TimeInput label="Check Out Time" name="checkOutTime" />

            <div>
              <Label htmlFor="totalWorkingHours">Total Working Hours</Label>
              <Input id="totalWorkingHours" name="totalWorkingHours" placeholder="Enter total working hours" />
            </div>

            <DateInput label="Date of Joining" name="dateOfJoining" />
          </div>

          {/* Submit Button */}
          <DialogFooter className="col-span-2 flex justify-end mt-2">
            <Button
              type="submit"
              className="bg-[#5965AB] text-white font-semibold rounded-md px-6 py-2"
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

export default EmployeeTrigger;

// Reusable components for time and date inputs
const TimeInput = ({ label, name }) => (
  <div className="flex flex-col w-full max-w-sm mx-auto">
    <Label className="mb-2 text-sm font-semibold text-gray-800">{label}</Label>
    <div className="relative">
      <Input
        id={name}
        name={name}
        type="time"
        className="w-full px-4 py-3 pr-12 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
      />
      <span className="absolute inset-y-0 right-3 flex items-center text-gray-400 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </span>
    </div>
  </div>
);

const DateInput = ({ label, name }) => (
  <div className="flex flex-col w-full max-w-sm mx-auto mt-4">
    <Label className="mb-2 text-sm font-semibold text-gray-800">{label}</Label>
    <div className="relative">
      <Input
        id={name}
        name={name}
        type="date"
        className="w-full px-4 py-3 pr-12 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
      />
      <span className="absolute inset-y-0 right-3 flex items-center text-gray-400 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </span>
    </div>
  </div>
);
