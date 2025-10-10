"usen client";
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const InvoiceDashboard = () => {

      const [invoice, setInvoice] = useState([]); 
      const [loading, setLoading] = useState(true);
      const { user } = useSelector((state) => state.User);
    
      useEffect(() => {
        const fetchclients = async () => {
          try {
            const res = await axios.get(`/api/gat-all-invoice/${user.id}`);
            setInvoice(res.data?.invoices); 

          } catch (error) {
            console.error("Error fetching employees:", error);
            setExpense([]); 
          } finally {
            setLoading(false);
          }
        };
    
        fetchclients();
      }, []);
  return (
    <>
    
    
    </>
  )
}

export default InvoiceDashboard