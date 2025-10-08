import React from 'react'
import { Users, Building, Briefcase } from 'lucide-react';
const BoxGridSales = () => {
     const cardsData = [
    {
      title: 'Total Sales',
      value: '3',
      icon: <Users size={32} />,
      iconColor: 'bg-gray-100 text-gray-700',
    },
    {
      title: 'commission',
      value: '20%',
      icon: <Building size={32} />,
      iconColor: 'bg-gray-100 text-gray-700',
    },
    {
      title: 'Assign Contracts',
      value: '28',
      icon: <Briefcase size={32} />,
      iconColor: 'bg-gray-100 text-gray-700',
    },
  ];
  return (
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
  )
}
export default BoxGridSales