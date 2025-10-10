"use client"
import React, { useState } from "react"
import {
  Home,
  Calendar,
  HelpCircle,
  LogOut,
  Menu,
  X,
  ArrowLeft,
  Users,
  DollarSign,
} from "lucide-react"
import { usePathname } from "next/navigation"

const Sidebar = () => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  


  const salesBasePath = pathname.split("/").slice(0, 3).join("/") 
  const salesLinks = [
    { href: `/sales`, label: "Overview", icon: <Home className="2xl:w-5 w-4 2xl:h-5 h-4" /> },
    { href: `${salesBasePath}/invoices`, label: "Invoices", icon: <DollarSign className="2xl:w-5 w-4 2xl:h-5 h-4" /> },
    { href: `${salesBasePath}/attendance`, label: "Attendance", icon: <Users className="2xl:w-5 w-4 2xl:h-5 h-4" /> },
    { href: `${salesBasePath}/contracts`, label: "Contracts", icon: <Calendar className="2xl:w-5 w-4 2xl:h-5 h-4" /> },
  ]


  const links = pathname.startsWith("/sales") ? salesLinks : salesLinks

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-28 left-4 z-50 bg-[#5965AB] text-white p-2 rounded-md"
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed bg-white shadow-sm flex flex-col z-40 justify-between transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          lg:mt-28 lg:rounded-xl lg:px-6 lg:py-8 lg:w-[18%] lg:h-[78vh]
          ${open ? "h-screen w-[60%] sm:w-[40%] top-0 left-0 px-6 py-8" : ""}
        `}
      >
        {/* Top Section */}
        <div>
          <nav className="flex flex-col gap-2 text-xs 2xl:text-lg">
            {links.map((link) => {
              const isActive = pathname === link.href
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors
                    ${isActive
                      ? "bg-gradient-to-r from-[#5965AB] to-[#60B89E] text-white"
                      : "text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  {link.icon} {link.label}
                </a>
              )
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col gap-2 text-xs 2xl:text-lg">
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            <HelpCircle className="2xl:w-5 w-4 2xl:h-5 h-4" /> Help & Information
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-500 hover:bg-red-100"
          >
            <LogOut className="2xl:w-5 w-4 2xl:h-5 h-4" /> Log Out
          </a>
        </div>
      </aside>
    </>
  )
}

export default Sidebar