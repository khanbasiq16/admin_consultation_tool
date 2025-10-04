"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DailogTriger from "./DailogTriger";
import axios from "axios";
import { Building2, MapPin, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import NormalEmployeetrigger from "./NormalEmployeetrigger";
import { EmployeeTable } from "./EmployeeTable";

const NormalEmployeesdashboard = () => {
  const [allemployess, setallemployee] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get("/api/get-employees");
        setallemployee(res.data?.employees || []); // ✅ axios returns response in res.data
      } catch (error) {
        console.error("Error fetching companies:", error);
        setallemployee([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex flex-col h-[64vh] overflow-auto">
      {loading ? (
        <p className="text-center text-gray-500">Loading companies...</p>
      ) : allemployess.length === 0 ? (
        <div className="flex h-full justify-center items-center">
          <NormalEmployeetrigger />
        </div>
      ) : (
        <>
          <EmployeeTable employees={allemployess} />
        </>
      )}
    </div>
  );
};

export default NormalEmployeesdashboard;
