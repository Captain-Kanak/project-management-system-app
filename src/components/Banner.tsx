import React from "react";

const Banner: React.FC = () => {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="absolute top-0 right-0 -mt-20 -mr-20 hidden lg:block">
        <div className="w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
        <div className="text-center lg:text-left lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-1/2">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Manage your workspace</span>
              <span className="block text-blue-600">with precision.</span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto lg:mx-0 md:mt-5 md:text-xl">
              A secure, role-based platform designed for modern teams. Access
              your dashboard, manage assets, and collaborate in real-time.
            </p>

            <div className="mt-8 sm:flex sm:justify-center lg:justify-start gap-4">
              <div className="rounded-md shadow">
                <a
                  href="/login"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-all"
                >
                  Sign In
                </a>
              </div>
              <div className="mt-3 sm:mt-0">
                <a
                  href="/register"
                  className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-blue-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-all"
                >
                  Join via Invite
                </a>
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-400">
              Registration requires a valid invite token.
            </p>
          </div>

          <div className="mt-12 lg:mt-0 lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-lg">
              <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
              <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>

              <div className="relative bg-white border border-gray-200 rounded-2xl shadow-2xl p-6 transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-100 rounded w-full"></div>
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="h-20 bg-blue-50 rounded-lg border border-blue-100"></div>
                    <div className="h-20 bg-gray-50 rounded-lg"></div>
                    <div className="h-20 bg-gray-50 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
