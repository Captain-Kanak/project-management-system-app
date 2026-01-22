import React, { useState } from "react";
import { Link, Outlet, NavLink } from "react-router";
import DashboardHeader from "../dashboard/DashboardHeader";
import { Toaster } from "react-hot-toast";
import { CiViewBoard } from "react-icons/ci";
import { FaUsersCog } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarRightCollapse,
} from "react-icons/tb";
import { useAuth } from "../auth/AuthContext";
import { GrProjects } from "react-icons/gr";

const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user } = useAuth();
  const userRole = user?.role;

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

        <nav className="flex-1 px-4 py-6 space-y-2">
          {/* Use 'end' for the base dashboard route so it isn't active for every sub-page */}
          <SidebarItem
            destination="/dashboard"
            icon={<CiViewBoard />}
            label="Overview"
            isOpen={isSidebarOpen}
            end
          />

          <div className="pt-4 border-t border-slate-700">
            <p
              className={`text-[10px] font-bold text-slate-500 mb-2 px-3 ${!isSidebarOpen && "text-center"}`}
            >
              {isSidebarOpen ? "PROJECTS" : "PRO"}
            </p>
            <SidebarItem
              destination="/dashboard/projects"
              icon={<GrProjects />}
              label="All Projects"
              isOpen={isSidebarOpen}
            />

            {userRole === "ADMIN" && (
              <div className="mt-4">
                <p
                  className={`text-[10px] font-bold text-slate-500 mb-2 px-3 ${!isSidebarOpen && "text-center"}`}
                >
                  {isSidebarOpen ? "ADMINISTRATION" : "ADM"}
                </p>
                <SidebarItem
                  destination="/dashboard/manage-users"
                  icon={<FaUsersCog />}
                  label="Manage Users"
                  isOpen={isSidebarOpen}
                />
                <SidebarItem
                  destination="/dashboard/settings"
                  icon={<IoSettingsOutline />}
                  label="Settings"
                  isOpen={isSidebarOpen}
                />
              </div>
            )}
          </div>
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
              <TbLayoutSidebarRightCollapse size={20} />
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

// --- Helper Component ---

interface SidebarItemProps {
  destination: string;
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
  end?: boolean;
}

const SidebarItem = ({
  destination,
  icon,
  label,
  isOpen,
  end = false,
}: SidebarItemProps) => (
  <NavLink
    to={destination}
    end={end}
    className={({ isActive }) => `
      flex items-center p-3 rounded-lg transition-all duration-200
      ${
        isActive
          ? "bg-blue-600 text-white shadow-lg"
          : "text-slate-300 hover:bg-slate-800 hover:text-white"
      }
    `}
  >
    <span className="text-xl shrink-0">{icon}</span>
    {isOpen && (
      <span className="ml-3 font-medium text-sm truncate">{label}</span>
    )}
  </NavLink>
);

export default DashboardLayout;
