"use client";
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DailogTriger from "./DailogTriger";
import axios from "axios";
import { Building2, MapPin, Phone } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import EmployeeTrigger from "./EmployeeTriger";

const EmployeeDashboard = () => {
  const [employess, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const {slug} = useParams()
  const router = useRouter()

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`/api/get-all-employess/${slug}`);
        setEmployees(res.data?.companies || []); 
      } catch (error) {
        console.error("Error fetching companies:", error);
        setCompanies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div className=" p-6 rounded-xl shadow-md flex flex-col h-[64vh] overflow-auto">

      {/* Loading State */}
      {/* {loading ? ( */}
        {/* <p className="text-center text-gray-500">Loading companies...</p>
      ) : companies.length === 0 ? ( */}
        <div className="flex h-full justify-center items-center">
          <EmployeeTrigger />
        </div>

    {/* //   ) : */}
      
      {/* } */}
    </div>
  );
};

export default EmployeeDashboard;
