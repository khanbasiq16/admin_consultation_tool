"use client"
import React from 'react'
import { Users, Briefcase, FileText, ShoppingCart, Layers, Building2 } from 'lucide-react';
import { Button } from "@/components/ui/button"; // ShadCN Button
import { useParams, useRouter } from 'next/navigation';

const OverviewBoxGrid = () => {


  const router = useRouter()
  const {slug} = useParams()

  const cardsData = [
    { title: 'Employees', value: '17', icon: <Users size={32} />, iconColor: 'bg-gray-100 text-gray-700' },
    { title: 'Clients', value: '28', icon: <Briefcase size={32} />, iconColor: 'bg-gray-100 text-gray-700' },
    { title: 'Contracts', value: '12', icon: <FileText size={32} />, iconColor: 'bg-gray-100 text-gray-700' },
    { title: 'Sales', value: '56', icon: <ShoppingCart size={32} />, iconColor: 'bg-gray-100 text-gray-700' },
    { title: 'Templates', value: '8', icon: <Layers size={32} />, iconColor: 'bg-gray-100 text-gray-700' },
    { title: 'Company Admin', value: '3', icon: <Building2 size={32} />, iconColor: 'bg-gray-100 text-gray-700' },
  ];




  return (
    <div className='space-y-6'>

      {/* Breadcrumb + Button Row */}
      <div className="w-full pr-3 flex justify-between items-center">
        <nav className="text-sm text-gray-500">
          <span className="text-gray-700 font-medium">Overview</span> / Dashboard
        </nav>
      <Button
  onClick={() => router.push(`/companydetails/${slug}/companyadmin`)}
  className="bg-[#5965AB] text-white font-semibold rounded-md px-4 py-2"
>
  + Assign Company Admin
</Button>
      </div>

      {/* Overview Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {cardsData.map((card, index) => (
          <div key={index} className='bg-white p-6 rounded-xl shadow-md flex flex-col'>
            <div className='flex items-center space-x-3 mb-4'>
              <div className={`p-2 rounded-lg ${card.iconColor}`}>
                {card.icon}
              </div>
              <span className='text-gray-600 font-medium text-lg'>{card.title}</span>
            </div>
            <div className='flex items-end justify-between mt-auto pl-2'>
              <span className='text-2xl 2xl:text-4xl font-bold text-gray-800'>{card.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OverviewBoxGrid;
