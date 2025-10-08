"use client";
import React, { useState, useEffect } from "react";
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

const InvoiceTrigger = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  const { slug } = useParams();
  const capitalizedCompanyName = slug
    ? slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
    : "";

  // 🔹 Generate invoice number & date when modal opens
  useEffect(() => {
    if (open) {
      const randomNum = Math.floor(100 + Math.random() * 900); // random 3-digit number
      setInvoiceNumber(`INV-${randomNum}`);
      setCurrentDate(new Date().toLocaleDateString("en-GB")); // e.g., 08/10/2025
    }
  }, [open]);

  // 🔹 Fetch clients
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await axios.get(`/api/get-all-clients/${slug}`);
        setClients(res.data.clients || []);
      } catch (error) {
        toast.error("Failed to fetch clients");
      }
    };
    fetchClients();
  }, [slug]);

  // 🔹 Search filter
  useEffect(() => {
    if (search.trim() === "") setFilteredClients([]);
    else {
      setFilteredClients(
        clients.filter((c) =>
          c.clientName.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, clients]);

  // 🔹 Handle submit
  const handleInvoiceSubmit = async (e) => {
    e.preventDefault();
    if (!selectedClient) {
      toast.error("Please select a client first");
      return;
    }

    setLoading(true);
    try {
      const data = Object.fromEntries(new FormData(e.target));
      data.companyName = slug;
      data.clientId = selectedClient._id;
      data.invoiceNumber = invoiceNumber;
      data.invoiceDate = currentDate;

      const res = await axios.post("/api/create-invoice", data, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.data.success) {
        toast.success("Invoice Created Successfully!");
        e.target.reset();
        setSelectedClient(null);
        setSearch("");
        setOpen(false);
      } else toast.error(res.data.error || "Failed to create invoice");
    } catch (error) {
      toast.error("Error creating invoice");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#2C3E50] text-white font-semibold">
          + Generate Invoice
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[750px]">
        <DialogHeader>
          <DialogTitle>Generate Invoice</DialogTitle>
          {capitalizedCompanyName && (
            <p className="text-sm text-gray-500 mt-1">
              Company:{" "}
              <span className="font-semibold">{capitalizedCompanyName}</span>
            </p>
          )}
        </DialogHeader>

        <form
          onSubmit={handleInvoiceSubmit}
          className="space-y-6 mt-3 max-h-[75vh] overflow-y-auto p-2"
        >
          {/* 🔹 Invoice Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label>Invoice Number</Label>
              <Input
                name="invoiceNumber"
                value={invoiceNumber}
                readOnly
                className="mt-1 px-3 py-2 cursor-not-allowed bg-gray-100"
              />
            </div>
            <div>
              <Label>Date</Label>
              <div className="mt-1 px-3 py-2  rounded-md flex justify-end text-gray-700">
                {currentDate}
              </div>
            </div>
          </div>

          {/* 🔹 Client Search */}
          <div className="relative">
            <Label>Select Client</Label>
            <Input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setSelectedClient(null);
              }}
              placeholder="Search client..."
              className="mt-1"
            />
            {filteredClients.length > 0 && (
              <div className="absolute z-50 bg-white border w-full mt-1 rounded-md shadow max-h-40 overflow-y-auto">
                {filteredClients.map((c) => (
                  <div
                    key={c._id}
                    onClick={() => {
                      setSearch(c.clientName);
                      setSelectedClient(c);
                      setFilteredClients([]);
                    }}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {c.clientName}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 🔹 Client Details */}
          {selectedClient && (
            <div className="p-4 border rounded-md bg-gray-50 space-y-2 text-sm">
              <p>
                <strong>Name:</strong> {selectedClient.clientName}
              </p>
              <p>
                <strong>Email:</strong> {selectedClient.clientEmail}
              </p>
              <p>
                <strong>Phone:</strong> {selectedClient.clientPhone}
              </p>
              <p>
                <strong>Address:</strong> {selectedClient.clientAddress}
              </p>
              {selectedClient.clientWebsite && (
                <p>
                  <strong>Website:</strong>{" "}
                  <a
                    href={selectedClient.clientWebsite}
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    {selectedClient.clientWebsite}
                  </a>
                </p>
              )}
            </div>
          )}

          {/* 🔹 Invoice Fields */}
          <div>
            <Label>Description</Label>
            <textarea
              name="invoiceDescription"
              rows={4}
              placeholder="Enter invoice description..."
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          <div>
            <Label>Total Amount</Label>
            <Input
              name="invoiceAmount"
              type="number"
              placeholder="Enter total amount"
              required
              className="mt-1"
            />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={loading}
              className="bg-[#2C3E50] text-white"
            >
              {loading ? "Generating..." : "Generate Invoice"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceTrigger;
