"use client"
import React, { useState } from "react"
import TableClients from "./TableClients"
import TableEmployee from "./TableEmployee"
import TableCommission from "./TableCommission"
import { motion, AnimatePresence } from "framer-motion"
const OverviewTabs = () => {
  const [activeTab, setActiveTab] = useState("clients")
  // :white_check_mark: Variants for animation
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }
  return (
    <div className="w-full bg-white mt-5 rounded-xl pt-7 lg:pt-5">
      {/* Tabs */}
      <div className="flex w-full px-10">
        <button
          onClick={() => setActiveTab("clients")}
          className={`flex-1 py-3 text-center font-medium transition-colors duration-300 ${
            activeTab === "clients"
              ? "bg-gradient-to-r from-[#5965AB] to-[#60B89E] text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Clients
        </button>
        <button
          onClick={() => setActiveTab("employees")}
          className={`flex-1 py-3 text-center font-medium transition-colors duration-300 ${
            activeTab === "employees"
              ? "bg-gradient-to-r from-[#5965AB] to-[#60B89E] text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Employees
        </button>
        <button
          onClick={() => setActiveTab("commission")}
          className={`flex-1 py-3 text-center font-medium transition-colors duration-300 ${
            activeTab === "commission"
              ? "bg-gradient-to-r from-[#5965AB] to-[#60B89E] text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Commission
        </button>
      </div>
      {/* Content with Animation */}
      <div className="relative min-h-[300px]">
        <AnimatePresence mode="wait">
          {activeTab === "clients" && (
            <motion.div
              key="clients"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.3 }}
            >
              <TableClients />
            </motion.div>
          )}
          {activeTab === "employees" && (
            <motion.div
              key="employees"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.3 }}
            >
              <TableEmployee />
            </motion.div>
          )}
          {activeTab === "commission" && (
            <motion.div
              key="commission"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.3 }}
            >
              <TableCommission />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
export default OverviewTabs