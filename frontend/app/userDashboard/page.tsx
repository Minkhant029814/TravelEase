"use client";
import React, { useState } from "react";

import {
  UserIcon,
  CalendarIcon,
  CreditCardIcon,
  BellIcon,
  MessageSquareIcon,
  SettingsIcon,
} from "lucide-react";
import Link from "next/link";
import { AppHook } from "@/context/AppProvider";
const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  // Mock user data
  // const user = {
  //   name: "Jane Smith",
  //   email: "jane.smith@example.com",
  //   joinDate: "January 2022",
  //   upcomingReservations: 2,
  //   pastReservations: 5,
  //   notifications: 3,
  // };
  const { user } = AppHook();
  console.log(user);
  // Mock reservation data
  const upcomingReservations = [
    {
      id: 1,
      destination: "Paris, France",
      dates: "June 15-22, 2023",
      confirmationCode: "CONF123456",
      status: "Confirmed",
    },
    {
      id: 2,
      destination: "Tokyo, Japan",
      dates: "August 3-10, 2023",
      confirmationCode: "CONF789012",
      status: "Pending Payment",
    },
  ];
  // Mock notification data
  const notifications = [
    {
      id: 1,
      type: "reservation",
      message: "Your Paris trip is coming up in 2 weeks!",
      date: "2 days ago",
    },
    {
      id: 2,
      type: "payment",
      message: "Payment confirmation for Tokyo trip received.",
      date: "1 week ago",
    },
    {
      id: 3,
      type: "promotion",
      message: "Special 20% discount on your next booking!",
      date: "2 weeks ago",
    },
  ];
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Dashboard header */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-4 py-5 sm:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full p-3">
                <UserIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome {user?.name}
                </h1>
                {/* <p className="text-gray-500">Member since {user.joinDate}</p> */}
              </div>
            </div>
            <div className="mt-4 sm:mt-0">
              <Link
                href="/settings"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <SettingsIcon className="h-4 w-4 mr-2" />
                Account Settings
              </Link>
            </div>
          </div>
        </div>
        {/* Dashboard navigation */}
        <div className="bg-white shadow rounded-lg mb-6 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px overflow-x-auto">
              <button
                onClick={() => setActiveTab("overview")}
                className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === "overview"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("reservations")}
                className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === "reservations"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                My Reservations
              </button>
              <button
                onClick={() => setActiveTab("notifications")}
                className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === "notifications"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Notifications
                {/* <span className="ml-2 bg-blue-100 text-blue-600 py-0.5 px-2 rounded-full text-xs">
                  {user.notifications}
                </span> */}
              </button>
              <button
                onClick={() => setActiveTab("support")}
                className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === "support"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Customer Support
              </button>
            </nav>
          </div>
          {/* Tab content */}
          <div className="p-6">
            {activeTab === "overview" && (
              <div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                          <CalendarIcon className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              Upcoming Trips
                            </dt>
                            <dd>
                              {/* <div className="text-lg font-medium text-gray-900">
                                {user.upcomingReservations}
                              </div> */}
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-5 py-3">
                      <div className="text-sm">
                        <Link
                          href="/reservations"
                          className="font-medium text-blue-600 hover:text-blue-500"
                        >
                          View all
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                          <CreditCardIcon className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              Past Trips
                            </dt>
                            <dd>
                              {/* <div className="text-lg font-medium text-gray-900">
                                {user.pastReservations}
                              </div> */}
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-5 py-3">
                      <div className="text-sm">
                        <Link
                          href="/reservations?filter=past"
                          className="font-medium text-blue-600 hover:text-blue-500"
                        >
                          View history
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                          <BellIcon className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              Notifications
                            </dt>
                            <dd>
                              {/* <div className="text-lg font-medium text-gray-900">
                                {user.notifications}
                              </div> */}
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-5 py-3">
                      <div className="text-sm">
                        <button
                          onClick={() => setActiveTab("notifications")}
                          className="font-medium text-blue-600 hover:text-blue-500"
                        >
                          View all
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <h2 className="text-lg font-medium text-gray-900">
                    Upcoming Trips
                  </h2>
                  <div className="mt-2 bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                      {upcomingReservations.map((reservation) => (
                        <li key={reservation.id}>
                          <Link
                            href={`/reservations/${reservation.id}`}
                            className="block hover:bg-gray-50"
                          >
                            <div className="px-4 py-4 sm:px-6">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-blue-600 truncate">
                                  {reservation.destination}
                                </p>
                                <div className="ml-2 flex-shrink-0 flex">
                                  <p
                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                      reservation.status === "Confirmed"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-yellow-100 text-yellow-800"
                                    }`}
                                  >
                                    {reservation.status}
                                  </p>
                                </div>
                              </div>
                              <div className="mt-2 sm:flex sm:justify-between">
                                <div className="sm:flex">
                                  <p className="flex items-center text-sm text-gray-500">
                                    <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                    {reservation.dates}
                                  </p>
                                </div>
                                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                  <p>
                                    Confirmation: {reservation.confirmationCode}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "notifications" && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Your Notifications
                </h2>
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                  <ul className="divide-y divide-gray-200">
                    {notifications.map((notification) => (
                      <li key={notification.id}>
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center">
                            <div
                              className={`flex-shrink-0 rounded-md p-2 ${
                                notification.type === "reservation"
                                  ? "bg-blue-100"
                                  : notification.type === "payment"
                                  ? "bg-green-100"
                                  : "bg-purple-100"
                              }`}
                            >
                              {notification.type === "reservation" ? (
                                <CalendarIcon className="h-5 w-5 text-blue-600" />
                              ) : notification.type === "payment" ? (
                                <CreditCardIcon className="h-5 w-5 text-green-600" />
                              ) : (
                                <BellIcon className="h-5 w-5 text-purple-600" />
                              )}
                            </div>
                            <div className="ml-4 flex-1">
                              <p className="text-sm font-medium text-gray-900">
                                {notification.message}
                              </p>
                              <p className="text-sm text-gray-500">
                                {notification.date}
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {activeTab === "reservations" && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  My Reservations
                </h2>
                <p className="text-gray-500 mb-6">
                  View and manage all your upcoming and past trips.
                </p>
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Upcoming Trips
                    </h3>
                  </div>
                  <ul className="divide-y divide-gray-200">
                    {upcomingReservations.map((reservation) => (
                      <li key={reservation.id}>
                        <Link
                          href={`/reservations/${reservation.id}`}
                          className="block hover:bg-gray-50"
                        >
                          <div className="px-4 py-4 sm:px-6">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-blue-600 truncate">
                                {reservation.destination}
                              </p>
                              <div className="ml-2 flex-shrink-0 flex">
                                <p
                                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    reservation.status === "Confirmed"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {reservation.status}
                                </p>
                              </div>
                            </div>
                            <div className="mt-2 sm:flex sm:justify-between">
                              <div className="sm:flex">
                                <p className="flex items-center text-sm text-gray-500">
                                  <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                  {reservation.dates}
                                </p>
                              </div>
                              <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                <p>
                                  Confirmation: {reservation.confirmationCode}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6">
                  <Link
                    href="/reservations/history"
                    className="text-blue-600 hover:text-blue-500 font-medium"
                  >
                    View past trips →
                  </Link>
                </div>
              </div>
            )}
            {activeTab === "support" && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Customer Support
                </h2>
                <p className="text-gray-500 mb-6">
                  Need help with your booking? Our support team is here to
                  assist you.
                </p>
                <div className="bg-white shadow sm:rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Contact Support
                    </h3>
                    <div className="mt-2 max-w-xl text-sm text-gray-500">
                      <p>
                        Submit a request and our team will get back to you
                        within 24 hours.
                      </p>
                    </div>
                    <form className="mt-5 sm:flex sm:items-center">
                      <div className="w-full sm:max-w-xs">
                        <label htmlFor="support-type" className="sr-only">
                          Support Type
                        </label>
                        <select
                          id="support-type"
                          name="support-type"
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                          <option>Reservation Change</option>
                          <option>Payment Issue</option>
                          <option>Cancellation Request</option>
                          <option>General Inquiry</option>
                        </select>
                      </div>
                      <div className="mt-3 w-full sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                        <Link
                          href="/support/new"
                          className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <MessageSquareIcon className="h-4 w-4 mr-2" />
                          Start Request
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <h3 className="text-lg font-medium text-gray-900">
                        Frequently Asked Questions
                      </h3>
                      <div className="mt-4 space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">
                            How can I change my reservation?
                          </h4>
                          <p className="mt-1 text-sm text-gray-500">
                            You can modify your reservation up to 48 hours
                            before your scheduled trip.
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">
                            What is your cancellation policy?
                          </h4>
                          <p className="mt-1 text-sm text-gray-500">
                            Full refunds are available for cancellations made 7
                            days prior to your trip.
                          </p>
                        </div>
                      </div>
                      <div className="mt-5">
                        <Link
                          href="/faq"
                          className="text-sm font-medium text-blue-600 hover:text-blue-500"
                        >
                          View all FAQs →
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <h3 className="text-lg font-medium text-gray-900">
                        Contact Information
                      </h3>
                      <div className="mt-4 space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">
                            Customer Support
                          </h4>
                          <p className="mt-1 text-sm text-gray-500">
                            support@travelease.example.com
                            <br />
                            +1 (555) 123-4567
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">
                            Hours of Operation
                          </h4>
                          <p className="mt-1 text-sm text-gray-500">
                            Monday - Friday: 9AM - 8PM EST
                            <br />
                            Saturday - Sunday: 10AM - 6PM EST
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserDashboard;
