import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../auth/AuthContext";

const DashboardHeader: React.FC = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="hidden sm:flex items-center relative w-96">
        <span className="absolute left-3 text-gray-400">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search records..."
          className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
        />
      </div>

      <div className="flex items-center space-x-4">
        <div className="h-8 w-px bg-gray-200 mx-2"></div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center space-x-3 focus:outline-none group cursor-pointer"
          >
            <div className="text-right hidden lg:block">
              <p className="text-sm font-semibold text-gray-800 leading-none">
                {user?.name}
              </p>
              <p className="text-xs text-center text-gray-500 mt-1">
                {user?.role}
              </p>
            </div>
            <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm">
              {user?.name.charAt(0)}
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-xl shadow-xl py-2 z-50">
              <a
                href="#settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Account Settings
              </a>
              <a
                href="#support"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Support Help
              </a>
              <hr className="my-2 border-gray-100" />
              <button
                onClick={() => {
                  logout?.();
                  setShowProfileMenu(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
