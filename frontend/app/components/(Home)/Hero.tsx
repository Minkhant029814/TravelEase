import React, { memo } from "react";

import { SearchIcon } from "lucide-react";
import Link from "next/link";
const Hero = () => {
  return (
    <div className="relative bg-gray-900">
      <div className="absolute inset-0">
        <img
          className="h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
          alt="Travel destination"
        />
        <div className="absolute inset-0 bg-gray-900 opacity-60"></div>
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Discover Your Next Adventure
        </h1>
        <p className="mt-6 text-xl text-gray-100 max-w-3xl">
          Explore amazing destinations, create unforgettable memories, and
          travel with confidence. Book your perfect trip today with TravelEase.
        </p>
        <div className="mt-10 max-w-xl">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-grow">
                  <input
                    type="text"
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-4 pr-12 sm:text-sm border-gray-300 rounded-md py-3"
                    placeholder="Where would you like to go?"
                  />
                </div>
                <div className="ml-3">
                  <button className="inline-flex items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <SearchIcon className="h-5 w-5 mr-2" />
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex space-x-4 justify-center sm:justify-start">
            <Link
              href="/destinations"
              className="text-white hover:text-blue-200 font-medium"
            >
              Popular Destinations
            </Link>
            <Link
              href="/travel-tips"
              className="text-white hover:text-blue-200 font-medium"
            >
              Travel Tips
            </Link>
            <Link
              href="/support"
              className="text-white hover:text-blue-200 font-medium"
            >
              Need Help?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
