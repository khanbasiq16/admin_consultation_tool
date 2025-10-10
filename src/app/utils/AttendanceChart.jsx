"use client";
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
// :art: Colors for statuses
const statusColors = {
  Present: "#4CAF50",
  Late: "#FFC107",
  Off: "#F44336",
};
// :small_blue_diamond: Generate month-wise attendance + weekdays
const generateAttendance = (month) => {
  const statuses = ["Present", "Late", "Off"];
  const year = 2025;
  const monthIndex = new Date(`${month} 1, ${year}`).getMonth();
  const totalDays = new Date(year, monthIndex + 1, 0).getDate();
  const days = Array.from({ length: totalDays }, (_, i) => {
    const date = new Date(year, monthIndex, i + 1);
    const weekday = date.toLocaleDateString("en-US", { weekday: "short" }); // Mon, Tue etc
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    return {
      day: i + 1,
      weekday,
      status,
      value: status === "Present" ? 1 : status === "Late" ? 0.5 : 0,
    };
  });
  return days;
};
// :dart: Tooltip Component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { day, weekday, status } = payload[0].payload;
    return (
      <div className="bg-white border border-gray-200 p-2 rounded-md shadow-md">
        <p className="text-sm font-semibold text-gray-800">
          Day {day} ({weekday})
        </p>
        <p
          className={`text-sm font-medium ${
            status === "Present"
              ? "text-green-600"
              : status === "Late"
              ? "text-yellow-600"
              : "text-red-600"
          }`}
        >
          Status: {status}
        </p>
      </div>
    );
  }
  return null;
};
const AttendanceChart = () => {
  const [month, setMonth] = useState("August");
  const [data, setData] = useState(generateAttendance("August"));
  useEffect(() => {
    setData(generateAttendance(month));
  }, [month]);
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Daily Attendance Report
          </h2>
          <p className="text-sm text-gray-500">
            Attendance summary for {month}
          </p>
        </div>
        {/* :white_check_mark: Month Dropdown */}
        <Select value={month} onValueChange={setMonth}>
          <SelectTrigger className="w-[180px] bg-gray-50 border border-gray-300">
            <SelectValue placeholder="Select Month" />
          </SelectTrigger>
          <SelectContent>
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/* Chart Wrapper */}
      <div className="overflow-x-auto">
        <div className="min-w-[1000px] h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 20, left: 0, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="day"
                tick={({ x, y, payload }) => {
                  const d = data[payload.index];
                  return (
                    <g transform={`translate(${x},${y})`}>
                      <text
                        x={0}
                        y={0}
                        dy={12}
                        textAnchor="middle"
                        fill="#6B7280"
                        fontSize={10}
                      >
                        {d.day}
                      </text>
                      <text
                        x={0}
                        y={15}
                        dy={12}
                        textAnchor="middle"
                        fill="#9CA3AF"
                        fontSize={9}
                      >
                        {d.weekday}
                      </text>
                    </g>
                  );
                }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(val) =>
                  val === 1 ? "Present" : val === 0.5 ? "Late" : "Off"
                }
                tick={{ fill: "#6B7280", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                domain={[0, 1]}
                ticks={[0, 0.5, 1]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" barSize={24} radius={[8, 8, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={index} fill={statusColors[entry.status]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Legend */}
      <div className="flex justify-center mt-4 space-x-6">
        <div className="flex items-center space-x-2">
          <span className="h-3 w-3 rounded-full bg-green-500"></span>
          <span className="text-sm text-gray-600">Present</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
          <span className="text-sm text-gray-600">Late</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="h-3 w-3 rounded-full bg-red-500"></span>
          <span className="text-sm text-gray-600">Off</span>
        </div>
      </div>
    </div>
  );
};
export default AttendanceChart;