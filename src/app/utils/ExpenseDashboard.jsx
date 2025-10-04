"use client"

import { Card } from '@/components/ui/card';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Expensetrigger from './Expensetrigger';
import { Expensetable } from './Expensetable';

const ExpenseDashboard = () => {

    const [expense, setExpense] = useState([]); 
      const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        const fetchclients = async () => {
          try {
            const res = await axios.get(`/api/get-all-expense`);
           
            setExpense(res.data?.expenses || []); 
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
     <Card className="p-6 rounded-xl shadow-md flex flex-col h-[64vh] overflow-auto">
      {loading ? (
        <p className="text-center text-gray-500">Loading Clients...</p>
      ) : expense.length === 0 ? (
        <div className="flex h-full justify-center items-center">
          <Expensetrigger />
        </div>
    ) : (
        <>
        <Expensetable expenses={expense}/>
        </>
      )}
       
    </Card>
    </>
  )
}

export default ExpenseDashboard