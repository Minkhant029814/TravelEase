"use client";

import React, { useEffect, useState } from "react";
import {
    CalendarIcon,
    CreditCardIcon,
    CheckIcon,
    XIcon,
    AlertCircleIcon,
    FilterIcon,
} from "lucide-react";
import Link from "next/link";

import api from "@/lib/api";
import { AppHook } from "@/context/AppProvider";
import { toast } from "sonner";

const Reservations = () => {
    const [upComingReservations, setUpComingReservations] = useState([]);
    const [pastReservations, setPastReservations] = useState([]);
    const [filter, setFilter] = useState("upcoming");
    const [showFilters, setShowFilters] = useState(false);
    const { user } = AppHook();

    const fetchReservations = async () => {
        try {
            const [upComingResponse, pastResponse] = await Promise.all([
                api.getUpComingReservations(Number(user?.id)),
                api.getPastReservations(Number(user?.id)),
            ]);
            setUpComingReservations(upComingResponse.data);
            setPastReservations(pastResponse.data);
        } catch (error) {
            console.error("Error fetching reservations:", error);
            toast.error("Failed to fetch reservations.");
        }
    };

    useEffect(() => {
        if (user?.id) {
            fetchReservations();
        }
    }, [user?.id]);

    const deleteReservation = async (id: number) => {
        try {
            await api.deleteReservation(id);
            setUpComingReservations((prev) =>
                prev.filter((reservation) => reservation.id !== id)
            );
            toast.success("Reservation canceled successfully!");
        } catch (error) {
            toast.error("Failed to cancel reservation. Please try again.");
            console.error("Error canceling reservation:", error);
        }
    };

    const updateReservationStatus = async (id: number, newStatus: string) => {
        try {
            const updatedReservation = await api.updateReservation(id, {
                status: newStatus,
            });
            if (newStatus === "Completed") {
                // Find the reservation in upComingReservations to preserve its data
                const currentReservation = upComingReservations.find(
                    (reservation) => reservation.id === id
                );
                if (!currentReservation) {
                    throw new Error("Reservation not found in upcoming list");
                }
                // Move reservation from upcoming to past
                setUpComingReservations((prev) =>
                    prev.filter((reservation) => reservation.id !== id)
                );
                // Normalize travel_details and other fields
                const travelDetails = currentReservation.travel_details
                    ? typeof currentReservation.travel_details === "string"
                        ? JSON.parse(currentReservation.travel_details)
                        : currentReservation.travel_details
                    : { start_date: "N/A", end_date: "N/A", travelers: "N/A" };
                const normalizedReservation = {
                    ...updatedReservation,
                    ...currentReservation,
                    status: newStatus,
                    travel_details: JSON.stringify(travelDetails),
                    destination: currentReservation.destination ||
                        updatedReservation.destination || { name: "Unknown" },
                    image:
                        currentReservation.image ||
                        updatedReservation.image ||
                        "default.jpg",
                    payment_options:
                        currentReservation.payment_options ||
                        updatedReservation.payment_options ||
                        "N/A",
                    amount:
                        currentReservation.amount ||
                        updatedReservation.amount ||
                        null,
                    confirmation_code:
                        currentReservation.confirmation_code ||
                        updatedReservation.confirmation_code ||
                        "N/A",
                };
                setPastReservations((prev) => [normalizedReservation, ...prev]);
            } else {
                // Update status in upcoming reservations
                setUpComingReservations((prev) =>
                    prev.map((reservation) =>
                        reservation.id === id
                            ? { ...reservation, status: newStatus }
                            : reservation
                    )
                );
            }
            toast.success(`Reservation status updated to ${newStatus}!`);
        } catch (error) {
            toast.error(
                "Failed to update reservation status. Please try again."
            );
            console.error("Error updating reservation status:", error);
        }
    };

    const parseTravelDetails = (travelDetails) => {
        try {
            if (!travelDetails) {
                return { start_date: "N/A", end_date: "N/A", travelers: "N/A" };
            }
            return typeof travelDetails === "string"
                ? JSON.parse(travelDetails)
                : travelDetails;
        } catch (error) {
            console.error("Error parsing travel_details:", error);
            return { start_date: "N/A", end_date: "N/A", travelers: "N/A" };
        }
    };

    const displayedReservations =
        filter === "upcoming" ? upComingReservations : pastReservations;

    const getStatusBadgeColor = (status) => {
        switch (status) {
            case "Up Coming":
                return "bg-green-100 text-green-800";
            case "Pending":
                return "bg-yellow-100 text-yellow-800";
            case "Completed":
                return "bg-blue-100 text-blue-800";
            case "Cancelled":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getPaymentStatusBadgeColor = (paymentStatus) => {
        switch (paymentStatus) {
            case "Paid":
                return "bg-green-100 text-green-800";
            case "Awaiting Payment":
                return "bg-yellow-100 text-yellow-800";
            case "Partially Paid":
                return "bg-blue-100 text-blue-800";
            case "Refunded":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const statusOptions = ["Completed", "Pending", "Cancelled"];

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="md:flex md:items-center md:justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            My Reservations
                        </h1>
                        <p className="mt-1 text-gray-500">
                            Manage all your travel bookings in one place.
                        </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <Link
                            href="/destinations"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                        >
                            Book New Trip
                        </Link>
                    </div>
                </div>
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="border-b border-gray-200">
                        <div className="flex justify-between items-center p-4">
                            <div className="sm:hidden">
                                <label
                                    htmlFor="reservation-filter"
                                    className="sr-only"
                                >
                                    Select filter
                                </label>
                                <select
                                    id="reservation-filter"
                                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                >
                                    <option value="upcoming">
                                        Upcoming Trips
                                    </option>
                                    <option value="past">Past Trips</option>
                                </select>
                            </div>
                            <div className="hidden sm:block">
                                <nav
                                    className="flex space-x-4"
                                    aria-label="Tabs"
                                >
                                    <button
                                        onClick={() => setFilter("upcoming")}
                                        className={`px-3 py-2 font-medium text-sm rounded-md ${
                                            filter === "upcoming"
                                                ? "bg-blue-100 text-blue-blue-700"
                                                : "text-gray-500 hover:text-gray-700"
                                        }`}
                                    >
                                        Upcoming Trips
                                    </button>
                                    <button
                                        onClick={() => setFilter("past")}
                                        className={`px-3 py-2 font-medium text-sm rounded-md ${
                                            filter === "past"
                                                ? "bg-blue-100 text-blue-700"
                                                : "text-gray-500 hover:text-gray-700"
                                        }`}
                                    >
                                        Past Trips
                                    </button>
                                </nav>
                            </div>
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <FilterIcon className="h-4 w-4 mr-2" />
                                Filters
                            </button>
                        </div>
                        {showFilters && (
                            <div className="p-4 border-t border-gray-200 bg-gray-50">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    <div>
                                        <label
                                            htmlFor="status-filter"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Status
                                        </label>
                                        <select
                                            id="status-filter"
                                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                        >
                                            <option value="">
                                                All Statuses
                                            </option>
                                            <option value="confirmed">
                                                Confirmed
                                            </option>
                                            <option value="pending">
                                                Pending
                                            </option>
                                            <option value="completed">
                                                Completed
                                            </option>
                                            <option value="cancelled">
                                                Cancelled
                                            </option>
                                        </select>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="date-filter"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            value
                                        </label>
                                        <input
                                            type="month"
                                            id="date-filter"
                                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                        />
                                    </div>
                                    <div className="flex items-end">
                                        <button className="w-full inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                            Apply Filters
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {displayedReservations.length > 0 ? (
                        <ul className="divide-y divide-gray-200">
                            {displayedReservations.map((reservation) => (
                                <li key={reservation.id} className="p-4 sm:p-6">
                                    <div className="flex flex-col sm:flex-row">
                                        <div className="sm:w-1/4 mb-4 sm:mb-0">
                                            <div className="aspect-w-16 aspect-h-9 sm:aspect-w-4 sm:aspect-h-3">
                                                <img
                                                    src={`http://localhost:8000/storage/${reservation.destination.image}`}
                                                    alt={
                                                        reservation.destination
                                                            ?.name ||
                                                        "Destination"
                                                    }
                                                    className="object-cover rounded-lg"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:w-3/4 sm:pl-6">
                                            <div className="flex flex-col sm:flex-row sm:justify-between">
                                                <h3 className="text-lg font-medium text-gray-900">
                                                    {reservation.destination
                                                        ?.name ||
                                                        "Unknown Destination"}
                                                </h3>
                                                <div className="mt-2 sm:mt-0 flex flex-wrap gap-2">
                                                    <span
                                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(
                                                            reservation.status
                                                        )}`}
                                                    >
                                                        {reservation.status}
                                                    </span>
                                                    <span
                                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusBadgeColor(
                                                            reservation.payment_options
                                                        )}`}
                                                    >
                                                        {
                                                            reservation.payment_options
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mt-2 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                                    <div>
                                                        {(() => {
                                                            const travel =
                                                                parseTravelDetails(
                                                                    reservation.travel_details
                                                                );
                                                            return (
                                                                <>
                                                                    <p>
                                                                        Start
                                                                        Date:{" "}
                                                                        {
                                                                            travel.start_date
                                                                        }
                                                                    </p>
                                                                    <p>
                                                                        End
                                                                        Date:{" "}
                                                                        {
                                                                            travel.end_date
                                                                        }
                                                                    </p>
                                                                    <p>
                                                                        Travelers:{" "}
                                                                        {
                                                                            travel.travelers
                                                                        }
                                                                    </p>
                                                                </>
                                                            );
                                                        })()}
                                                    </div>
                                                </div>
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <CreditCardIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                                    {reservation.amount
                                                        ? `$${parseFloat(
                                                              reservation.amount
                                                          ).toFixed(2)}`
                                                        : "N/A"}
                                                </div>
                                            </div>
                                            <div className="mt-2 text-sm text-gray-500">
                                                Confirmation:{" "}
                                                {reservation.confirmation_code ||
                                                    "N/A"}
                                            </div>
                                            <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                                <div className="flex flex-wrap gap-2">
                                                    <Link
                                                        href={`/reservations/${reservation.id}`}
                                                        className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                                    >
                                                        View Details
                                                    </Link>
                                                    {filter === "upcoming" && (
                                                        <>
                                                            <Link
                                                                href={`/reservations/${reservation.id}/edit`}
                                                                className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                                            >
                                                                Modify
                                                            </Link>
                                                            {reservation.status !==
                                                                "Cancelled" && (
                                                                <>
                                                                    <button
                                                                        onClick={() =>
                                                                            deleteReservation(
                                                                                reservation.id
                                                                            )
                                                                        }
                                                                        className="inline-flex items-center px-3 py-1 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
                                                                    >
                                                                        Cancel
                                                                    </button>
                                                                    <div className="relative inline-block text-left">
                                                                        <select
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                updateReservationStatus(
                                                                                    reservation.id,
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                            className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                                                                            defaultValue=""
                                                                        >
                                                                            <option
                                                                                value=""
                                                                                disabled
                                                                            >
                                                                                Update
                                                                                Status
                                                                            </option>
                                                                            {statusOptions
                                                                                .filter(
                                                                                    (
                                                                                        status
                                                                                    ) =>
                                                                                        status !==
                                                                                        reservation.status
                                                                                )
                                                                                .map(
                                                                                    (
                                                                                        status
                                                                                    ) => (
                                                                                        <option
                                                                                            key={
                                                                                                status
                                                                                            }
                                                                                            value={
                                                                                                status
                                                                                            }
                                                                                        >
                                                                                            {
                                                                                                status
                                                                                            }
                                                                                        </option>
                                                                                    )
                                                                                )}
                                                                        </select>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                                {filter === "past" && (
                                                    <div className="flex flex-wrap gap-2">
                                                        <Link
                                                            href={`/reviews/create/${reservation.id}`}
                                                            className="inline-flex items-center px-3 py-1 border border-blue-300 text-sm font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50"
                                                        >
                                                            Write Review
                                                        </Link>
                                                        <Link
                                                            href={`/reviews/view/${reservation.id}`}
                                                            className="inline-flex items-center px-3 py-1 border border-blue-300 text-sm font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50"
                                                        >
                                                            View Review
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="p-6 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100">
                                <CalendarIcon className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className="mt-2 text-lg font-medium text-gray-900">
                                No reservations found
                            </h3>
                            <p className="mt-1 text-gray-500">
                                {filter === "upcoming"
                                    ? "You don't have any upcoming trips. Start planning your next adventure!"
                                    : "You don't have any past trips yet."}
                            </p>
                            {filter === "upcoming" && (
                                <div className="mt-6">
                                    <Link
                                        href="/destinations"
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Explore Destinations
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reservations;
