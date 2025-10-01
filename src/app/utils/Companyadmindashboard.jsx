

// "use client";
// import React, { useState, useEffect } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableHeader,
//   TableRow,
//   TableHead,
//   TableBody,
//   TableCell,
// } from "@/components/ui/table";
// import { Card } from "@/components/ui/card";
// import { useParams } from "next/navigation";
// import axios from "axios";

// const Companyadmindashboard = () => {
//   const [employees, setEmployees] = useState([]); 
//   const [adminemployee, setAdminEmployee] = useState([]); 
//   const [search, setSearch] = useState("");
//   const [filteredEmployees, setFilteredEmployees] = useState([]);
//   const [selectedEmployees, setSelectedEmployees] = useState([]);
//   const { slug } = useParams();

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const res = await axios.get(`/api/get-all-employess/${slug}`);

//         setEmployees(res.data?.employees || []);
//       } catch (error) {
//         console.error("Error fetching employees:", error);
//       }
//     };
//     if (slug) fetchEmployees();
//   }, [slug]);


//   useEffect(() => {
//   const fetchEmployees = async () => {
//     try {
//       // ✅ Updated API endpoint
//       const res = await axios.get(`/api/get-company-admins/${slug}`);

//       // keep everything else same
//       console.log(res.data?.employees )
//       setAdminEmployee(res.data?.employees || []);
//     } catch (error) {
//       console.error("Error fetching employees:", error);
//     }
//   };
//   if (slug) fetchEmployees();
// }, [slug]);

//   const handleSearch = (value) => {
//     setSearch(value);
//     if (!value.trim()) return setFilteredEmployees([]);

//     const results = employees.filter((emp) =>
//       emp.employeeName.toLowerCase().includes(value.toLowerCase())
//     );
//     setFilteredEmployees(results);
//   };

//   const addEmployeeToTable = (emp) => {
//     const id = emp.id || emp.employeeCNIC; // fallback if no id field
//     if (!selectedEmployees.find((e) => (e.id || e.employeeCNIC) === id)) {
//       setSelectedEmployees([
//         ...selectedEmployees,
//         { ...emp, securityKey: "", id },
//       ]);
//     }
//     setSearch("");
//     setFilteredEmployees([]);
//   };

//   const assignSecurityKey = (id) => {
//     const key = `${slug}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
//     const updated = selectedEmployees.map((emp) =>
//       (emp.id || emp.employeeCNIC) === id ? { ...emp, securityKey: key } : emp
//     );
//     setSelectedEmployees(updated);
//   };

//   return (
//     <Card className="p-6 rounded-xl shadow-md flex flex-col h-[64vh] overflow-auto">
//       <div className="relative w-72">
//         <Input
//           placeholder="Search Employee..."
//           value={search}
//           onChange={(e) => handleSearch(e.target.value)}
//           className="w-full"
//         />

//         {filteredEmployees.length > 0 && (
//           <Card className="absolute top-12 w-full shadow-md border z-10">
//             {filteredEmployees.map((emp) => (
//               <div
//                 key={emp.id || emp.employeeCNIC}
//                 onClick={() => addEmployeeToTable(emp)}
//                 className="p-2 hover:bg-gray-100 cursor-pointer"
//               >
//                 {emp.employeeName}
//               </div>
//             ))}
//           </Card>
//         )}
//       </div>

//       {selectedEmployees.length > 0 || adminemployee.length > 0 && (
//         <Table className="mt-6 border">
//           <TableHeader>
//             <TableRow>
//               <TableHead>Employee Name</TableHead>
//               <TableHead>Email</TableHead>
//               <TableHead>Security Key</TableHead>
//               <TableHead>Action</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {selectedEmployees.map((emp) => (
//               <TableRow key={emp.id || emp.employeeCNIC}>
//                 <TableCell>{emp.employeeName}</TableCell>
//                 <TableCell>{emp.employeeemail}</TableCell>
//                 <TableCell>
//                   {emp.securityKey ? (
//                     <span className="font-mono">{emp.securityKey}</span>
//                   ) : (
//                     <span className="text-gray-400">Not Assigned</span>
//                   )}
//                 </TableCell>
//                 <TableCell>
//                   <Button
//                     size="sm"
//                     onClick={() => assignSecurityKey(emp.id || emp.employeeCNIC)}
//                   >
//                     Assign Key
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       )}
//     </Card>
//   );
// };

// export default Companyadmindashboard;

"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { useParams } from "next/navigation";
import axios from "axios";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";

const Companyadmindashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [adminEmployees, setAdminEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const { slug } = useParams();

  // Fetch all employees
  useEffect(() => {
    if (!slug) return;
    const fetchEmployees = async () => {
      try {
        const res = await axios.get(`/api/get-all-employess/${slug}`);
        setEmployees(res.data?.employees || []);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, [slug]);

  // Fetch company admins
  useEffect(() => {
    if (!slug) return;
    const fetchAdminEmployees = async () => {
      try {
        const res = await axios.get(`/api/get-company-admins/${slug}`);
        console.log(res.data?.employees)
        setAdminEmployees(res.data?.employees || []);
      } catch (error) {
        console.error("Error fetching admin employees:", error);
      }
    };
    fetchAdminEmployees();
  }, [slug]);

  // Search logic
  const handleSearch = (value) => {
    setSearch(value);
    if (!value.trim()) return setFilteredEmployees([]);

    const results = employees.filter((emp) =>
      emp.employeeName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredEmployees(results);
  };

  // Add employee to selected table
  const addEmployeeToTable = (emp) => {
    const id = emp.id || emp.employeeCNIC; // fallback if no id field
    if (!selectedEmployees.find((e) => (e.id || e.employeeCNIC) === id)) {
      setSelectedEmployees([
        ...selectedEmployees,
        { ...emp, securityKey: "", id },
      ]);
    }
    setSearch("");
    setFilteredEmployees([]);
  };

  // Assign security key
  const assignSecurityKey = (id) => {
    const key = `${slug}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    const updated = selectedEmployees.map((emp) =>
      (emp.id || emp.employeeCNIC) === id ? { ...emp, securityKey: key } : emp
    );
    setSelectedEmployees(updated);
  };

  return (
    <Card className="p-6 rounded-xl shadow-md flex flex-col h-[64vh] overflow-auto">
      <div className="relative w-72">
        <Input
          placeholder="Search Employee..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full"
        />

        {filteredEmployees.length > 0 && (
          <Card className="absolute top-12 w-full shadow-md border z-10">
            {filteredEmployees.map((emp) => (
              <div
                key={emp.id || emp.employeeCNIC}
                onClick={() => addEmployeeToTable(emp)}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {emp.employeeName}
              </div>
            ))}
          </Card>
        )}
      </div>

      {(selectedEmployees.length > 0 || adminEmployees.length > 0) && (
        <Table className="mt-6 border">
          <TableHeader>
            <TableRow>
              <TableHead>Employee Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Security Key</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {selectedEmployees.map((emp) => (
  <TableRow key={emp.id || emp.employeeCNIC}>
    <TableCell>{emp.employeeName}</TableCell>
    <TableCell>{emp.employeeemail}</TableCell>
    <TableCell className="flex items-center gap-2">
      {emp.securityKey ? (
        <>
          <span className="font-mono">{emp.securityKey}</span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              navigator.clipboard.writeText(emp.securityKey);
              alert("Copied to clipboard!"); // optional toast instead of alert
            }}
          >
            <Copy/>
          </Button>
        </>
      ) : (
        <span className="text-gray-400">Not Assigned</span>
      )}
    </TableCell>
    <TableCell>
      <Button
        size="sm"
        onClick={() => assignSecurityKey(emp.id || emp.employeeCNIC)}
      >
        Assign Key
      </Button>
    </TableCell>
  </TableRow>
))}

            {/* Render admin employees as read-only (optional) */}
          {adminEmployees.map((emp) => (
  <TableRow key={emp.id || emp.employeeCNIC}>
    <TableCell>{emp.employeeName}</TableCell>
    <TableCell>{emp.employeeemail}</TableCell>
    <TableCell className="flex items-center gap-2">
      <span className="font-mono">{emp.securityKey || "N/A"}</span>
      {emp.securityKey && (
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            navigator.clipboard.writeText(emp.securityKey);
            toast.success("Copied to clipboard!"); // optional toast can replace alert
          }}
        >
         <Copy/>
        </Button>
      )}
    </TableCell>
    <TableCell>
      <Button size="sm" disabled>
        Assigned
      </Button>
    </TableCell>
  </TableRow>
))}

          </TableBody>
        </Table>
      )}
    </Card>
  );
};

export default Companyadmindashboard;
