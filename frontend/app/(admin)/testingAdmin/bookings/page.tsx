"use client";
import React, { useState, useEffect, useRef } from "react";
import { CheckIcon, XIcon, EyeIcon } from "lucide-react";
import AdminLayout from "../Layout";
import api from "@/lib/api";
import { AppHook } from "@/context/AppProvider";

interface User {
    id: number;
    name: string;
    email: string;
}

interface Destination {
    id: number;
    name: string;
    sort_by: string;
}

interface TravelDetails {
    start_date: string;
    end_date: string;
    travelers: number;
}

interface Reservation {
    id: number;
    user_id: number;
    destination_id: number;
    travel_details: string; // JSON string
    amount: string;
    status: string;
    created_at: string;
    confirmation_code: string;
}

const AdminBookings = () => {
    const [reservationsList, setReservationsList] = useState<Reservation[]>([]);
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [currentReservation, setCurrentReservation] =
        useState<Reservation | null>(null);
    const [filter, setFilter] = useState("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = AppHook();
    const viewModalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [
                    reservationsResponse,
                    destinationsResponse,
                    usersResponse,
                ] = await Promise.all([
                    api.getReservations(),
                    api.getDestinations(),
                    api.getUsers(),
                ]);
                setReservationsList(reservationsResponse.data);
                setDestinations(destinationsResponse.data);
                setUsers(usersResponse.data);
            } catch (err) {
                setError("Failed to fetch data");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (isViewModalOpen && viewModalRef.current) {
            viewModalRef.current.focus();
        }
    }, [isViewModalOpen]);

    const getDestinationById = (id: number): Destination => {
        return (
            destinations.find((dest) => dest.id === id) || {
                id: 0,
                name: "Unknown",
                sort_by: "",
            }
        );
    };

    const getUserById = (id: number): User => {
        return (
            users.find((user) => user.id === id) || {
                id: 0,
                name: "Unknown",
                email: "Unknown",
            }
        );
    };

    const parseTravelDetails = (travelDetails: string): TravelDetails => {
        try {
            return JSON.parse(travelDetails) as TravelDetails;
        } catch {
            return { start_date: "Unknown", end_date: "Unknown", travelers: 0 };
        }
    };

    const openViewModal = (reservation: Reservation) => {
        setCurrentReservation(reservation);
        setIsViewModalOpen(true);
    };

    const handleStatusChange = async (
        reservationId: number,
        newStatus: string
    ) => {
        try {
            const response = await api.updateReservation(reservationId, {
                status: newStatus,
            });
            setReservationsList(
                reservationsList.map((reservation) =>
                    reservation.id === reservationId
                        ? { ...reservation, status: newStatus }
                        : reservation
                )
            );
        } catch (err) {
            setError("Failed to update reservation status");
            console.error(err);
        }
    };

    const filteredReservations =
        filter === "all"
            ? reservationsList
            : reservationsList.filter(
                  (reservation) =>
                      reservation.status.toLowerCase() === filter.toLowerCase()
              );

    if (!user || user.role !== "admin") {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg text-gray-600">
                    You do not have permission to access this page.
                </p>
            </div>
        );
    }

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-screen">
                    <p className="text-lg text-gray-600">Loading...</p>
                </div>
            </AdminLayout>
        );
    }

    if (error) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-screen">
                    <p className="text-lg text-gray-600">{error}</p>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="px-4 py-6 sm:p-0">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-3xl font-semibold text-gray-800">
                            Reservations Management
                        </h1>
                        <p className="mt-2 text-sm text-gray-600">
                            View and manage all travel reservations.
                        </p>
                    </div>
                    <div className="flex items-center">
                        <span className="text-sm text-gray-700 mr-2">
                            Filter:
                        </span>
                        <select
                            value={filter}
                            onChange={(
                                e: React.ChangeEvent<HTMLSelectElement>
                            ) => setFilter(e.target.value)}
                            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                            <option value="all">All Reservations</option>
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>
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
                                                Reservation ID
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
                                        {filteredReservations.map(
                                            (reservation) => {
                                                const destination =
                                                    getDestinationById(
                                                        reservation.destination_id
                                                    );
                                                const user = getUserById(
                                                    reservation.user_id
                                                );
                                                const travelDetails =
                                                    parseTravelDetails(
                                                        reservation.travel_details
                                                    );
                                                return (
                                                    <tr key={reservation.id}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            #{reservation.id}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {
                                                                    destination.name
                                                                }
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                {
                                                                    destination.sort_by
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
                                                                {
                                                                    travelDetails.start_date
                                                                }
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                to{" "}
                                                                {
                                                                    travelDetails.end_date
                                                                }
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            $
                                                            {parseFloat(
                                                                reservation.amount
                                                            ).toLocaleString()}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span
                                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                                    reservation.status.toLowerCase() ===
                                                                        "confirmed" ||
                                                                    reservation.status.toLowerCase() ===
                                                                        "completed"
                                                                        ? "bg-green-100 text-green-800"
                                                                        : reservation.status.toLowerCase() ===
                                                                          "pending"
                                                                        ? "bg-yellow-100 text-yellow-800"
                                                                        : "bg-red-100 text-red-800"
                                                                }`}
                                                            >
                                                                {reservation.status
                                                                    ? reservation.status
                                                                          .charAt(
                                                                              0
                                                                          )
                                                                          .toUpperCase() +
                                                                      reservation.status.slice(
                                                                          1
                                                                      )
                                                                    : "Unknown"}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <button
                                                                onClick={() =>
                                                                    openViewModal(
                                                                        reservation
                                                                    )
                                                                }
                                                                className="text-blue-600 hover:text-blue-900 mr-4"
                                                            >
                                                                <EyeIcon className="h-5 w-5" />
                                                            </button>
                                                            {reservation.status.toLowerCase() ===
                                                                "pending" && (
                                                                <>
                                                                    <button
                                                                        onClick={() =>
                                                                            handleStatusChange(
                                                                                reservation.id,
                                                                                "Confirmed"
                                                                            )
                                                                        }
                                                                        className="text-green-600 hover:text-green-900 mr-4"
                                                                    >
                                                                        <CheckIcon className="h-5 w-5" />
                                                                    </button>
                                                                    <button
                                                                        onClick={() =>
                                                                            handleStatusChange(
                                                                                reservation.id,
                                                                                "Cancelled"
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
                                            }
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {filteredReservations.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">
                            No reservations found.
                        </p>
                    </div>
                )}
            </div>
            {isViewModalOpen && currentReservation && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                    onClick={() => setIsViewModalOpen(false)}
                >
                    <div
                        ref={viewModalRef}
                        className="relative bg-white rounded-lg px-4 pt-5 pb-4 shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6"
                        onClick={(e) => e.stopPropagation()}
                        tabIndex={-1}
                    >
                        <div className="mt-3 sm:mt-0 sm:text-left">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Reservation Details
                            </h3>
                            <div className="mt-4">
                                <dl className="grid grid-cols-2 gap-x-4 gap-y-6">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">
                                            Reservation ID
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            #{currentReservation.id}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">
                                            Confirmation Code
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            {
                                                currentReservation.confirmation_code
                                            }
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">
                                            Status
                                        </dt>
                                        <dd className="mt-1">
                                            <span
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    currentReservation.status.toLowerCase() ===
                                                        "confirmed" ||
                                                    currentReservation.status.toLowerCase() ===
                                                        "completed"
                                                        ? "bg-green-100 text-green-800"
                                                        : currentReservation.status.toLowerCase() ===
                                                          "pending"
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : "bg-red-100 text-red-800"
                                                }`}
                                            >
                                                {currentReservation.status
                                                    ? currentReservation.status
                                                          .charAt(0)
                                                          .toUpperCase() +
                                                      currentReservation.status.slice(
                                                          1
                                                      )
                                                    : "Unknown"}
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
                                                    currentReservation.destination_id
                                                ).name
                                            }
                                            ,{" "}
                                            {
                                                getDestinationById(
                                                    currentReservation.destination_id
                                                ).sort_by
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
                                                    currentReservation.user_id
                                                ).name
                                            }{" "}
                                            (
                                            {
                                                getUserById(
                                                    currentReservation.user_id
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
                                            {
                                                parseTravelDetails(
                                                    currentReservation.travel_details
                                                ).start_date
                                            }
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">
                                            Check-out Date
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            {
                                                parseTravelDetails(
                                                    currentReservation.travel_details
                                                ).end_date
                                            }
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">
                                            Number of Travelers
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            {
                                                parseTravelDetails(
                                                    currentReservation.travel_details
                                                ).travelers
                                            }
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">
                                            Total Amount
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            $
                                            {parseFloat(
                                                currentReservation.amount
                                            ).toLocaleString()}
                                        </dd>
                                    </div>
                                    <div className="col-span-2">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Booking Date
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            {new Date(
                                                currentReservation.created_at
                                            ).toLocaleString()}
                                        </dd>
                                    </div>
                                </dl>
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
            )}
        </AdminLayout>
    );
};

export default AdminBookings;
