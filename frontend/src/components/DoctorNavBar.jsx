import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";

const DoctorNavBar = () => {
  const { logout } = useAuthStore();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-2xl border-b border-white/20">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              VitalIQ
            </span>
          </div>
          <button
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1.5 sm:px-6 sm:py-2 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/25"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default DoctorNavBar;
