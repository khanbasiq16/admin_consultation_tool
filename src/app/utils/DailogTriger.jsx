// "use client";
// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
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

// const DailogTriger = () => {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);

// const formHandler = async (e) => {
//   e.preventDefault();
//   setLoading(true);

//   try {
//     const formData = new FormData();
//     formData.append("name", e.target.name.value);
//     formData.append("companyAddress", e.target.companyAddress.value);
//     formData.append("companyPhoneNumber", e.target.companyPhoneNumber.value);
//     if (file) formData.append("file", file);

//     const res = await axios.post("/api/create-company", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data", 
//       },
//     });

//     const data = res.data; 

//     if (data.success) {
//       toast.success("✅ " + data.message);
//       e.target.reset();
//       setFile(null);
//       setCompanyType("");
//     } else {
//       alert("❌ " + data.error);
//     }
//   } catch (error) {
//     console.error(error);
//     alert("Error creating company");
//   } finally {
//     setLoading(false);
//   }
// };


//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button className="bg-[#5965AB] text-white">+ Create Company</Button>
//       </DialogTrigger>

//       <DialogContent className="sm:max-w-[400px]">
//         <DialogHeader>
//           <DialogTitle>Create New Company</DialogTitle>
//         </DialogHeader>

//         {/* ✅ Form with API Call */}
//         <form onSubmit={formHandler} className="grid gap-4 mt-2 h-64 overflow-y-auto">
//           {/* Company Name */}
//           <div>
//             <Label htmlFor="name">Company Name</Label>
//             <Input
//               className="mt-2"
//               id="name"
//               name="name"
//               placeholder="Enter company name"
//               required
//             />
//           </div>

//           {/* Company Address */}
//           <div>
//             <Label htmlFor="companyAddress">Company Address</Label>
//             <Input
//               className="mt-2"
//               id="companyAddress"
//               name="companyAddress"
//               placeholder="Enter company address"
//             />
//           </div>

//           {/* Company Phone */}
//           <div>
//             <Label htmlFor="companyPhoneNumber">Company Phone</Label>
//             <Input
//               className="mt-2"
//               id="companyPhoneNumber"
//               name="companyPhoneNumber"
//               placeholder="Enter phone number"
//             />
//           </div>

//           {/* Company Logo */}
//           <div>
//             <Label htmlFor="file">Company Logo</Label>
//             <Input
//               type="file"
//               className="mt-2"
//               id="file"
//               accept="image/*"
//               onChange={(e) => setFile(e.target.files[0])}
//             />
//           </div>

       
//           {/* Stripe Fields only for Sales */}
        
//               <div>
//                 <Label htmlFor="stripePublic">Stripe Public Key</Label>
//                 <Input
//                   className="mt-2"
//                   id="stripePublic"
//                   name="stripePublic"
//                   placeholder="Enter Stripe Public Key"
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="stripePrivate">Stripe Private Key</Label>
//                 <Input
//                   className="mt-2"
//                   id="stripePrivate"
//                   name="stripePrivate"
//                   placeholder="Enter Stripe Private Key"
//                 />
//               </div>

//           <DialogFooter className="flex justify-end gap-3 mt-4">
//             <Button
//               type="submit"
//               className="bg-[#5965AB] text-white"
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

// export default DailogTriger;

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

const DailogTriger = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const formHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", e.target.name.value);
      formData.append("companyAddress", e.target.companyAddress.value);
      formData.append("companyPhoneNumber", e.target.companyPhoneNumber.value);
      formData.append("stripePublic", e.target.stripePublic.value);
      formData.append("stripePrivate", e.target.stripePrivate.value);
      if (file) formData.append("file", file);

      const res = await axios.post("/api/create-company", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = res.data;

      if (data.success) {
        toast.success("✅ " + data.message);
        e.target.reset();
        setFile(null);
      } else {
        alert("❌ " + data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Error creating company");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#5965AB] text-white">+ Create Company</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Company</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={formHandler}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 p-2 h-84 overflow-y-auto"
        >
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Company Name</Label>
              <Input
                className="mt-2"
                id="name"
                name="name"
                placeholder="Enter company name"
                required
              />
            </div>

            <div>
              <Label htmlFor="companyAddress">Company Address</Label>
              <Input
                className="mt-2"
                id="companyAddress"
                name="companyAddress"
                placeholder="Enter company address"
              />
            </div>

            <div>
              <Label htmlFor="companyPhoneNumber">Company Phone</Label>
              <Input
                className="mt-2"
                id="companyPhoneNumber"
                name="companyPhoneNumber"
                placeholder="Enter phone number"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="file">Company Logo</Label>
              <Input
                type="file"
                className="mt-2"
                id="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>

            <div>
              <Label htmlFor="stripePublic">Stripe Public Key</Label>
              <Input
                className="mt-2"
                id="stripePublic"
                name="stripePublic"
                placeholder="Enter Stripe Public Key"
              />
            </div>

            <div>
              <Label htmlFor="stripePrivate">Stripe Private Key</Label>
              <Input
                className="mt-2"
                id="stripePrivate"
                name="stripePrivate"
                placeholder="Enter Stripe Private Key"
              />
            </div>
          </div>

          <DialogFooter className="col-span-2 flex justify-end gap-3 mt-4">
            <Button
              type="submit"
              className="bg-[#5965AB] text-white"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DailogTriger;
