'use client';
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { ChevronDown } from 'lucide-react';
// :abacus: Sample Attendance Data
const data = [
  { name: 'Jan', attendance: 22 },
  { name: 'Feb', attendance: 18 },
  { name: 'Mar', attendance: 25 },
  { name: 'Apr', attendance: 20 },
  { name: 'May', attendance: 21 },
  { name: 'Jun', attendance: 23 },
  { name: 'Jul', attendance: 19 },
];
// :dart: Custom Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-md shadow-lg border border-gray-200">
        <p className="text-sm font-semibold text-gray-800">{`Month : ${label}`}</p>
        <p className="text-sm text-green-600">{`Attendance : ${payload[0].value} days`}</p>
      </div>
    );
  }
  return null;
};
const AttendanceGraph = () => {
  return (
    <div className="mt-6">
      <div className="bg-white p-6 rounded-xl shadow-md flex flex-col">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Employee Attendance Overview</h2>
            <p className="text-sm text-gray-500">
              Monthly attendance statistics for this year
            </p>
          </div>
          <div className="relative">
            <select className="appearance-none bg-gray-50 border border-gray-300 text-gray-700 py-2 pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>This year</option>
              <option>Last year</option>
              <option>Last 6 months</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown size={18} />
            </div>
          </div>
        </div>
        {/* Chart Section */}
        <div className="relative h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                {/* Gradient Definition */}
                <linearGradient id="attendanceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5962AC" />
                  <stop offset="100%" stopColor="#62BB9F" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6B7280', fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6B7280', fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              {/* :large_green_square: Gradient Fill Applied */}
              <Bar dataKey="attendance" fill="url(#attendanceGradient)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          {/* Floating Info Box */}
          <div className="absolute top-[calc(50%-40px)] left-[calc(45%-50px)] bg-gradient-to-r from-[#5962AC] to-[#62BB9F] text-white text-xs px-3 py-2 rounded-lg shadow-md flex items-center space-x-1 whitespace-nowrap">
            <span className="font-bold">Avg 21 Days</span>
            <span>per month</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AttendanceGraph;