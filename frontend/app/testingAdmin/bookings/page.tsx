"use client";
import React, { useState } from "react";
import { CheckIcon, XIcon, EyeIcon } from "lucide-react";

import { bookings, destinations, users } from "../mockData";
import AdminLayout from "../Layout";

const AdminBookings = () => {
    const [bookingsList, setBookingsList] = useState(bookings);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [currentBooking, setCurrentBooking] = useState(null);
    const [filter, setFilter] = useState("all");
    const getDestinationById = (id) => {
        return (
            destinations.find((dest) => dest.id === id) || {
                title: "Unknown",
                location: "Unknown",
            }
        );
    };
    const getUserById = (id) => {
        return (
            users.find((user) => user.id === id) || {
                name: "Unknown",
                email: "Unknown",
            }
        );
    };
    const openViewModal = (booking) => {
        setCurrentBooking(booking);
        setIsViewModalOpen(true);
    };
    const handleStatusChange = (bookingId, newStatus) => {
        const updatedBookings = bookingsList.map((booking) =>
            booking.id === bookingId
                ? {
                      ...booking,
                      status: newStatus,
                  }
                : booking
        );
        setBookingsList(updatedBookings);
    };
    const filteredBookings =
        filter === "all"
            ? bookingsList
            : bookingsList.filter((booking) => booking.status === filter);
    return (
        <AdminLayout>
            <div className="px-4 py-6 sm:px-0">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Bookings Management
                        </h1>
                        <p className="mt-1 text-sm text-gray-600">
                            View and manage all travel bookings
                        </p>
                    </div>
                    <div className="flex items-center">
                        <span className="text-sm text-gray-700 mr-2">
                            Filter:
                        </span>
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                            <option value="all">All Bookings</option>
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </div>
                {/* Bookings Table */}
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Booking ID
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Destination
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Customer
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Dates
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Amount
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Status
                                            </th>
                                            <th
                                                scope="col"
                                                className="relative px-6 py-3"
                                            >
                                                <span className="sr-only">
                                                    Actions
                                                </span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredBookings.map((booking) => {
                                            const destination =
                                                getDestinationById(
                                                    booking.destinationId
                                                );
                                            const user = getUserById(
                                                booking.userId
                                            );
                                            return (
                                                <tr key={booking.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        #{booking.id}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {destination.title}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {
                                                                destination.location
                                                            }
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {user.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {user.email}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {booking.startDate}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            to {booking.endDate}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        $
                                                        {booking.totalPrice.toLocaleString()}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span
                                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                                booking.status ===
                                                                "confirmed"
                                                                    ? "bg-green-100 text-green-800"
                                                                    : booking.status ===
                                                                      "pending"
                                                                    ? "bg-yellow-100 text-yellow-800"
                                                                    : booking.status ===
                                                                      "cancelled"
                                                                    ? "bg-red-100 text-red-800"
                                                                    : "bg-blue-100 text-blue-800"
                                                            }`}
                                                        >
                                                            {booking.status
                                                                .charAt(0)
                                                                .toUpperCase() +
                                                                booking.status.slice(
                                                                    1
                                                                )}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <button
                                                            onClick={() =>
                                                                openViewModal(
                                                                    booking
                                                                )
                                                            }
                                                            className="text-blue-600 hover:text-blue-900 mr-4"
                                                        >
                                                            <EyeIcon className="h-5 w-5" />
                                                        </button>
                                                        {booking.status ===
                                                            "pending" && (
                                                            <>
                                                                <button
                                                                    onClick={() =>
                                                                        handleStatusChange(
                                                                            booking.id,
                                                                            "confirmed"
                                                                        )
                                                                    }
                                                                    className="text-green-600 hover:text-green-900 mr-4"
                                                                >
                                                                    <CheckIcon className="h-5 w-5" />
                                                                </button>
                                                                <button
                                                                    onClick={() =>
                                                                        handleStatusChange(
                                                                            booking.id,
                                                                            "cancelled"
                                                                        )
                                                                    }
                                                                    className="text-red-600 hover:text-red-900"
                                                                >
                                                                    <XIcon className="h-5 w-5" />
                                                                </button>
                                                            </>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {filteredBookings.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">
                            No bookings found.
                        </p>
                    </div>
                )}
            </div>
            {/* View Booking Modal */}
            {isViewModalOpen && currentBooking && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div
                            className="fixed inset-0 transition-opacity"
                            aria-hidden="true"
                        >
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div>
                                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                    <h3
                                        className="text-lg leading-6 font-medium text-gray-900"
                                        id="modal-headline"
                                    >
                                        Booking Details
                                    </h3>
                                    <div className="mt-4">
                                        <dl className="grid grid-cols-2 gap-x-4 gap-y-6">
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">
                                                    Booking ID
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900">
                                                    #{currentBooking.id}
                                                </dd>
                                            </div>
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">
                                                    Status
                                                </dt>
                                                <dd className="mt-1">
                                                    <span
                                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                            currentBooking.status ===
                                                            "confirmed"
                                                                ? "bg-green-100 text-green-800"
                                                                : currentBooking.status ===
                                                                  "pending"
                                                                ? "bg-yellow-100 text-yellow-800"
                                                                : currentBooking.status ===
                                                                  "cancelled"
                                                                ? "bg-red-100 text-red-800"
                                                                : "bg-blue-100 text-blue-800"
                                                        }`}
                                                    >
                                                        {currentBooking.status
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                            currentBooking.status.slice(
                                                                1
                                                            )}
                                                    </span>
                                                </dd>
                                            </div>
                                            <div className="col-span-2">
                                                <dt className="text-sm font-medium text-gray-500">
                                                    Destination
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900">
                                                    {
                                                        getDestinationById(
                                                            currentBooking.destinationId
                                                        ).title
                                                    }
                                                    ,{" "}
                                                    {
                                                        getDestinationById(
                                                            currentBooking.destinationId
                                                        ).location
                                                    }
                                                </dd>
                                            </div>
                                            <div className="col-span-2">
                                                <dt className="text-sm font-medium text-gray-500">
                                                    Customer
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900">
                                                    {
                                                        getUserById(
                                                            currentBooking.userId
                                                        ).name
                                                    }{" "}
                                                    (
                                                    {
                                                        getUserById(
                                                            currentBooking.userId
                                                        ).email
                                                    }
                                                    )
                                                </dd>
                                            </div>
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">
                                                    Check-in Date
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900">
                                                    {currentBooking.startDate}
                                                </dd>
                                            </div>
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">
                                                    Check-out Date
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900">
                                                    {currentBooking.endDate}
                                                </dd>
                                            </div>
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">
                                                    Number of Travelers
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900">
                                                    {currentBooking.travelers}
                                                </dd>
                                            </div>
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">
                                                    Total Amount
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900">
                                                    $
                                                    {currentBooking.totalPrice.toLocaleString()}
                                                </dd>
                                            </div>
                                            <div className="col-span-2">
                                                <dt className="text-sm font-medium text-gray-500">
                                                    Booking Date
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900">
                                                    {new Date(
                                                        currentBooking.createdAt
                                                    ).toLocaleString()}
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsViewModalOpen(false)}
                                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};
export default AdminBookings;
