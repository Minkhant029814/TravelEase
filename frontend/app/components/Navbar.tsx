"use client";

import React, { use, useState } from "react";

import {
  MenuIcon,
  XIcon,
  UserIcon,
  GlobeIcon,
  HeartIcon,
  HelpCircleIcon,
} from "lucide-react";
import Link from "next/link";
import { AppHook } from "@/context/AppProvider";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(true); // This would come from your auth context in a real app
  const { logout, authToken } = AppHook();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <GlobeIcon className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                TravelEase
              </span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className="border-transparent text-gray-500 hover:border-blue-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Home
              </Link>
              <Link
                href="/destinations"
                className="border-transparent text-gray-500 hover:border-blue-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Destinations
              </Link>
              <Link
                href="/travel-tips"
                className="border-transparent text-gray-500 hover:border-blue-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Travel Tips
              </Link>
              <Link
                href="/support"
                className="border-transparent text-gray-500 hover:border-blue-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Support
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {authToken ? (
              <>
                <Link
                  href="/reservations"
                  className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900"
                >
                  My Trips
                </Link>
                <Link
                  href="/userDashboard"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900"
                >
                  <UserIcon className="h-5 w-5 mr-1" />
                  Dashboard
                </Link>

                <button className="bg-red-800" onClick={logout}>
                  logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900"
                >
                  Log in
                </Link>
                <Link
                  href="/auth/register"
                  className="ml-3 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isMenuOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
            >
              Home
            </Link>
            <Link
              href="/destinations"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
            >
              Destinations
            </Link>
            <Link
              href="/travel-tips"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
            >
              Travel Tips
            </Link>
            <Link
              href="/support"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
            >
              Support
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {authToken ? (
              <div className="space-y-1">
                <Link
                  href="/reservations"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                >
                  My Trips
                </Link>
                <Link
                  href="/dashboard"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                >
                  Dashboard
                </Link>
              </div>
            ) : (
              <div className="space-y-1 px-4">
                <Link
                  href="auth/login"
                  className="block text-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md"
                >
                  Log in
                </Link>
                <Link
                  href="auth/register"
                  className="block text-center mt-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
