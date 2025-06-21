"use client";
import React, { useState } from "react";

import { CalendarIcon, MapPinIcon, StarIcon, FilterIcon } from "lucide-react";
import Link from "next/link";
const pastReservations = [
  {
    id: 1,
    destination: "Rome, Italy",
    hotel: "Grand Hotel Roma",
    dates: "March 5-12, 2023",
    image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1996&q=80",
    totalAmount: "$1,450.00",
    rating: 5,
    reviewed: true,
  },
  {
    id: 2,
    destination: "New York City, USA",
    hotel: "Manhattan Grand Hotel",
    dates: "January 15-20, 2023",
    image:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    totalAmount: "$950.00",
    rating: 4,
    reviewed: false,
  },
  {
    id: 3,
    destination: "Barcelona, Spain",
    hotel: "Barcelona Beach Resort",
    dates: "November 10-17, 2022",
    image:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    totalAmount: "$1,200.00",
    rating: 5,
    reviewed: true,
  },
];
const ReservationsHistory = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [yearFilter, setYearFilter] = useState("all");
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Travel History</h1>
            <p className="mt-1 text-gray-500">
              Review your past adventures and experiences
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <FilterIcon className="h-4 w-4 mr-2" />
              Filters
            </button>
          </div>
        </div>
        {showFilters && (
          <div className="bg-white shadow rounded-lg p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="year"
                  className="block text-sm font-medium text-gray-700"
                >
                  Year
                </label>
                <select
                  id="year"
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="all">All Years</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="rating"
                  className="block text-sm font-medium text-gray-700"
                >
                  Rating
                </label>
                <select
                  id="rating"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option>Any Rating</option>
                  <option>5 Stars</option>
                  <option>4+ Stars</option>
                  <option>3+ Stars</option>
                </select>
              </div>
              <div className="flex items-end">
                <button className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {pastReservations.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {pastReservations.map((reservation) => (
                <li key={reservation.id} className="p-6">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4 mb-4 md:mb-0">
                      <img
                        src={reservation.image}
                        alt={reservation.destination}
                        className="h-48 w-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="md:w-3/4 md:pl-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <h3 className="text-lg font-medium text-gray-900">
                          {reservation.destination}
                        </h3>
                        <div className="mt-2 md:mt-0">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, index) => (
                              <StarIcon
                                key={index}
                                className={`h-5 w-5 ${
                                  index < reservation.rating
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="mt-2 text-gray-600">{reservation.hotel}</p>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        {reservation.dates}
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        Total Amount: {reservation.totalAmount}
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Link
                          href={`/reservations/${reservation.id}`}
                          className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          View Details
                        </Link>
                        {!reservation.reviewed && (
                          <Link
                            href={`/reviews/create/${reservation.id}`}
                            className="inline-flex items-center px-3 py-1 border border-blue-300 text-sm font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50"
                          >
                            Write Review
                          </Link>
                        )}
                        {reservation.reviewed && (
                          <Link
                            href={`/reviews/${reservation.id}`}
                            className="inline-flex items-center px-3 py-1 border border-green-300 text-sm font-medium rounded-md text-green-700 bg-white hover:bg-green-50"
                          >
                            View Review
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-6 text-center">
              <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No travel history
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                You haven't completed any trips yet. Start planning your next
                adventure!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ReservationsHistory;
