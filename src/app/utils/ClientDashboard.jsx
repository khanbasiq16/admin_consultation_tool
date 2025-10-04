"use client";
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import axios from "axios";
import { useParams } from "next/navigation";
import ClientTrigger from "./ClientTriger";
import { Clienttable } from "./Clienttable";

const ClientDashboard = () => {
  const [clients, setClients] = useState([]); 
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    const fetchclients = async () => {
      try {
        const res = await axios.get(`/api/get-all-clients/${slug}`);
        console.log(res?.data?.clients)
        setClients(res.data?.clients || []); 
      } catch (error) {
        console.error("Error fetching employees:", error);
        setEmployees([]); // ✅ corrected
      } finally {
        setLoading(false);
      }
    };

    fetchclients();
  }, [slug]);

  return (
    <Card className="p-6 rounded-xl shadow-md flex flex-col h-[64vh] overflow-auto">
      {loading ? (
        <p className="text-center text-gray-500">Loading Clients...</p>
      ) : clients.length === 0 ? (
        <div className="flex h-full justify-center items-center">
          <ClientTrigger />
        </div>
      ) : (
        <>
        <Clienttable clients={clients}/>
        </>
      )}
    </Card>
  );
};

export default ClientDashboard;
