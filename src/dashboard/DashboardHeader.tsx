import React, { useState } from "react";

const DashboardHeader: React.FC = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

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
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative transition">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-px bg-gray-200 mx-2"></div>

        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center space-x-3 focus:outline-none group"
          >
            <div className="text-right hidden lg:block">
              <p className="text-sm font-semibold text-gray-800 leading-none">
                John Doe
              </p>
              <p className="text-xs text-gray-500 mt-1">Administrator</p>
            </div>
            <div className="h-9 w-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold border-2 border-transparent group-hover:border-blue-100 transition">
              JD
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
              <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium">
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
