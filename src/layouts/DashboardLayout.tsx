import React, { useState } from "react";
import { Link, Outlet } from "react-router";
import DashboardHeader from "../dashboard/DashboardHeader";
import { Toaster } from "react-hot-toast";
import { CiViewBoard } from "react-icons/ci";
import { FaUsersCog } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { TbLayoutSidebarRightCollapse } from "react-icons/tb";

const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userRole = "ADMIN";

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } hidden md:flex flex-col bg-slate-900 transition-all duration-300 ease-in-out`}
      >
        <Link to={"/"}>
          <div className="flex items-center justify-center h-16 bg-slate-950 text-white font-bold text-xl">
            {isSidebarOpen ? "Project MS" : "P"}
          </div>
        </Link>

        <nav className="flex-1 px-4 py-6 space-y-4">
          <SidebarItem
            icon={<CiViewBoard />}
            label="Overview"
            active
            isOpen={isSidebarOpen}
          />

          {userRole === "ADMIN" && (
            <div className="pt-4 border-t border-slate-700">
              <p
                className={`text-xs font-semibold text-slate-500 mb-4 ${!isSidebarOpen && "text-center"}`}
              >
                {isSidebarOpen ? "ADMINISTRATION" : "ADM"}
              </p>
              <SidebarItem
                icon={<FaUsersCog />}
                label="Manage Users"
                isOpen={isSidebarOpen}
              />
              <SidebarItem
                icon={<IoSettingsOutline />}
                label="Settings"
                isOpen={isSidebarOpen}
              />
            </div>
          )}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center justify-center gap-2 text-slate-400 hover:text-white text-sm cursor-pointer"
          >
            {isSidebarOpen ? (
              <>
                <TbLayoutSidebarLeftCollapse size={20} />
                <span>Collapse</span>
              </>
            ) : (
              <>
                <TbLayoutSidebarRightCollapse size={20} />
              </>
            )}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 bg-gray-50">
          <div className="container mx-auto">
            <Outlet />
            <Toaster />
          </div>
        </main>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, active = false, isOpen = true }: any) => (
  <a
    href="#"
    className={`
    flex items-center p-3 rounded-lg transition-colors
    ${active ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"}
  `}
  >
    <span className="text-xl">{icon}</span>
    {isOpen && <span className="ml-3 font-medium">{label}</span>}
  </a>
);

export default DashboardLayout;
