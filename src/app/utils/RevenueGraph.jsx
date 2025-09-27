'use client';
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronDown } from 'lucide-react';
const data = [
  { name: 'Jan', uv: 170 },
  { name: 'Feb', uv: 190 },
  { name: 'Mar', uv: 240 },
  { name: 'Apr', uv: 190 },
  { name: 'May', uv: 160 },
  { name: 'Jun', uv: 120 },
  { name: 'Jul', uv: 170 },
];
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-md shadow-lg border border-gray-200">
        <p className="text-sm font-semibold text-gray-800">{`Month : ${label}`}</p>
        <p className="text-sm text-green-600">{`Revenue : $${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};
const RevenueGraph = () => {
  return (
    <div className='mt-6'>
      <div className='bg-white p-6 rounded-xl shadow-md flex flex-col'>
        {/* Header Section */}
        <div className='flex justify-between items-center mb-4'>
          <div>
            <h2 className='text-xl font-bold text-gray-800'>Total revenue of this year</h2>
            <p className='text-sm text-gray-500'>Online and offline Revenue Of Sales Performance</p>
          </div>
          <div className='relative'>
            <select className='appearance-none bg-gray-50 border border-gray-300 text-gray-700 py-2 pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'>
              <option>This year</option>
              <option>Last year</option>
              <option>Last 6 months</option>
            </select>
            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
              <ChevronDown size={18} />
            </div>
          </div>
        </div>
        <div className='relative h-80 w-full'> {/* Added relative and height for ResponsiveContainer */}
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 0, left: -20, bottom: 0 }} // Adjusted left margin for YAxis ticks
            >
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="uv" stroke="#4CAF50" fillOpacity={0.7} fill="#5966AB" />
            </AreaChart>
          </ResponsiveContainer>
          <div className='absolute top-[calc(50%-40px)] left-[calc(45%-50px)] bg-gradient-to-r from-[#5965AB] to-[#60B89E] text-white text-xs px-3 py-2 rounded-lg shadow-md flex items-center space-x-1 whitespace-nowrap'>
            <span className='font-bold'>$8,361</span>
            <span>Last month</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RevenueGraph;
