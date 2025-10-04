


// "use client"
// import React, { useState } from "react"
// import {
//   Home,
//   Calendar,
//   HelpCircle,
//   LogOut,
//   Menu,
//   X,
//   ArrowLeft,
//   IdCardLanyard,
//   PersonStanding,
//   CardSim,
//   NotepadTextDashed,
// } from "lucide-react"
// import { usePathname } from "next/navigation"

// const Sidebar = () => {
//   const [open, setOpen] = useState(false)
//   const pathname = usePathname()

//   // Default dashboard links
//   const dashboardLinks = [
//     { href: "/", label: "Dashboard", icon: <Home className="2xl:w-5 w-4 2xl:h-5 h-4" /> },
//     { href: "/companies", label: "Companies", icon: <Calendar className="2xl:w-5 w-4 2xl:h-5 h-4" /> },
//   ]

//   // Company details links (when inside /companydetails/[slug])
//   const companyDetailsLinks = [
//     {
//       href: "/companies",
//       label: "← Back to Companies",
//       icon: <ArrowLeft className="2xl:w-5 w-4 2xl:h-5 h-4" />,
//     },
//     { href: pathname.split("/").slice(0, 3).join("/"), label: "Overview", icon: <Home className="2xl:w-5 w-4 2xl:h-5 h-4" /> },
//     { href: `${pathname.split("/").slice(0, 3).join("/")}/employees`, label: "Employees", icon: <IdCardLanyard className="2xl:w-5 w-4 2xl:h-5 h-4" /> },
//     { href: `${pathname.split("/").slice(0, 3).join("/")}/clients`, label: "Clients", icon: <PersonStanding className="2xl:w-5 w-4 2xl:h-5 h-4" /> },
//     { href: `${pathname.split("/").slice(0, 3).join("/")}/contracts`, label: "Contracts", icon: <CardSim className="2xl:w-5 w-4 2xl:h-5 h-4" /> },
//     { href: `${pathname.split("/").slice(0, 3).join("/")}/templates`, label: "Templates", icon: <NotepadTextDashed className="2xl:w-5 w-4 2xl:h-5 h-4" /> },
//   ]

//   // Choose which nav to show based on current path
//   const links = pathname.startsWith("/companydetails/") ? companyDetailsLinks : dashboardLinks

//   return (
//     <>
//       {/* Mobile Toggle Button */}
//       <button
//         onClick={() => setOpen(!open)}
//         className="lg:hidden fixed top-28 left-4 z-50 bg-[#5965AB] text-white p-2 rounded-md"
//       >
//         {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//       </button>

//       {/* Sidebar */}
//       <aside
//         className={`
//           fixed bg-white shadow-sm flex flex-col z-40 justify-between transition-transform duration-300
//           ${open ? "translate-x-0" : "-translate-x-[130%]"}
//           lg:translate-x-0
//           ${open ? "rounded-none h-screen w-[60%] sm:w-[40%] top-0 left-0 px-6 py-8" : ""}
//           lg:mt-28 lg:2xl:mt-32 lg:rounded-xl lg:px-6 lg:py-8 lg:w-[18%] lg:h-[78vh]
//         `}
//       >
//         {/* Top Section */}
//         <div>
//           <nav className="flex flex-col gap-2 text-xs 2xl:text-lg">
//             {links.map((link) => {
//               // Active link detection: exact match or starts with (nested routes)
//               const isActive =
//                 pathname === link.href || pathname.startsWith(link.href + "/")

//               return (
//                 <a
//                   key={link.href}
//                   href={link.href}
//                   className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors
//                     ${
//                       isActive
//                         ? "bg-gradient-to-r from-[#5965AB] to-[#60B89E] text-white"
//                         : "text-gray-600 hover:bg-gray-100"
//                     }`}
//                 >
//                   {link.icon} {link.label}
//                 </a>
//               )
//             })}
//           </nav>
//         </div>

//         {/* Bottom Section */}
//         <div className="flex flex-col gap-2 text-xs 2xl:text-lg">
//           <a
//             href="#"
//             className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
//           >
//             <HelpCircle className="2xl:w-5 w-4 2xl:h-5 h-4" /> Help & Information
//           </a>
//           <a
//             href="#"
//             className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-500 hover:bg-red-100"
//           >
//             <LogOut className="2xl:w-5 w-4 2xl:h-5 h-4" /> Log Out
//           </a>
//         </div>
//       </aside>
//     </>
//   )
// }

// export default Sidebar


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
  IdCardLanyard,
  PersonStanding,
  CardSim,
  NotepadTextDashed,
  Users,
  BanknoteArrowDown,
  HandCoins,
} from "lucide-react"
import { usePathname } from "next/navigation"

const Sidebar = () => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Default dashboard links
  const dashboardLinks = [
    { href: "/", label: "Dashboard", icon: <Home className="2xl:w-5 w-4 2xl:h-5 h-4" /> },
    { href: "/companies", label: "Companies", icon: <Calendar className="2xl:w-5 w-4 2xl:h-5 h-4" /> },
    { href: "/employees", label: "Employees", icon: <Users  className="2xl:w-5 w-4 2xl:h-5 h-4" /> },
    { href: "/expense", label: "Expenses", icon: <BanknoteArrowDown  className="2xl:w-5 w-4 2xl:h-5 h-4" /> },
    { href: "/account-manager", label: "Account Manager", icon: <HandCoins className="2xl:w-5 w-4 2xl:h-5 h-4" /> },
  ]

  const basePath = pathname.split("/").slice(0, 3).join("/") // /companydetails/[slug]
  const companyDetailsLinks = [
    { href: "/companies", label: "Back to Companies", icon: <ArrowLeft className="2xl:w-5 w-4 2xl:h-5 h-4" /> },
    { href: basePath, label: "Overview", icon: <Home className="2xl:w-5 w-4 2xl:h-5 h-4" /> },
    { href: `${basePath}/employees`, label: "Employees", icon: <IdCardLanyard className="2xl:w-5 w-4 2xl:h-5 h-4" /> },
    { href: `${basePath}/clients`, label: "Clients", icon: <PersonStanding className="2xl:w-5 w-4 2xl:h-5 h-4" /> },
    { href: `${basePath}/contracts`, label: "Contracts", icon: <CardSim className="2xl:w-5 w-4 2xl:h-5 h-4" /> },
    { href: `${basePath}/templates`, label: "Templates", icon: <NotepadTextDashed className="2xl:w-5 w-4 2xl:h-5 h-4" /> },
  ]

  const links = pathname.startsWith("/companydetails/") ? companyDetailsLinks : dashboardLinks

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
          ${open ? "translate-x-0" : "-translate-x-[130%]"}
          lg:translate-x-0
          ${open ? "rounded-none h-screen w-[60%] sm:w-[40%] top-0 left-0 px-6 py-8" : ""}
          lg:mt-28 lg:2xl:mt-32 lg:rounded-xl lg:px-6 lg:py-8 lg:w-[18%] lg:h-[78vh]
        `}
      >
        {/* Top Section */}
        <div>
          <nav className="flex flex-col gap-2 text-xs 2xl:text-lg">
            {links.map((link) => {
              const isActive = pathname === link.href // Only exact match

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
