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
import axios from "axios";
import { Building2, MapPin, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import Accounttrigger from "./Accounttrigger"; // :point_left: Manager creation modal
import { ManagerTable } from "./ManagerTable";
// import { ManagerTable } from "./ManagerTable"; // :point_left: You’ll create this similar to EmployeeTable
const ManagerDashboard = () => {
  const [allManagers, setAllManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const res = await axios.get("/api/get-managers"); // :point_left: updated endpoint
        console.log(res.data?.managers)
        setAllManagers(res.data?.managers || []);
      } catch (error) {
        console.error("Error fetching managers:", error);
        setAllManagers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchManagers();
  }, []);
  return (
    <div className="bg-white p-6  flex flex-col h-[64vh] overflow-auto">
      {loading ? (
        <p className="text-center text-gray-500">Loading managers...</p>
      ) : allManagers.length === 0 ? (
        <div className="flex h-full justify-center items-center">
          {/* :point_down: Button to open Manager creation dialog */}
          <Accounttrigger />
        </div>
      ) : (
        <>
          {/* :point_down: Table displaying all managers */}
          <ManagerTable managers={allManagers} />
        </>
      )}
    </div>
  );
};
export default ManagerDashboard;