"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
    CalendarIcon,
    CreditCardIcon,
    MapPinIcon,
    UsersIcon,
    ClockIcon,
    PrinterIcon,
    MailIcon,
    XIcon,
} from "lucide-react";
import { toast } from "react-toastify";
import api from "@/lib/api";

const ReservationDetail = () => {
    const params = useParams();
    const router = useRouter();
    const id = params?.details as string;
    const [reservations, setReservations] = useState([]);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchReservation = async () => {
        try {
            setLoading(true);
            const response = await api.getReservation(Number(id));
            setReservations([response.data]); // Store single reservation in array for mapping
        } catch (error) {
            console.error("Error fetching reservation:", error);
            toast.error("Failed to load reservation details.");
            setReservations([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchReservation();
        }
    }, [id]);
    console.log(reservations);

    const handleCancelReservation = async () => {
        try {
            await api.deleteReservation(Number(id));
            toast.success("Reservation canceled successfully!");
            setShowCancelModal(false);
            router.push("/reservations"); // Redirect to reservations list
        } catch (error) {
            console.error("Error canceling reservation:", error);
            toast.error("Failed to cancel reservation. Please try again.");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-gray-500 text-lg">Loading...</div>
            </div>
        );
    }

    if (reservations.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Reservation not found
                    </h2>
                    <p className="mt-2 text-gray-500">
                        The reservation you're looking for doesn't exist or has
                        been removed.
                    </p>
                    <Link
                        href="/reservations"
                        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                    >
                        Back to Reservations
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {reservations.map((reservation) => (
                    <React.Fragment key={reservation.id}>
                        {/* Header */}
                        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <div>
                                    <div className="flex items-center">
                                        <MapPinIcon className="h-6 w-6 text-blue-600 mr-2" />
                                        <h1 className="text-2xl font-bold text-gray-900">
                                            {reservation.destination?.name ||
                                                "Unknown Destination"}
                                        </h1>
                                    </div>
                                    <p className="mt-1 text-gray-500">
                                        Confirmation:{" "}
                                        {reservation.confirmation_code || "N/A"}
                                    </p>
                                </div>
                                <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
                                    <button
                                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                        onClick={() => window.print()}
                                    >
                                        <PrinterIcon className="h-4 w-4 mr-2" />
                                        Print
                                    </button>
                                    <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                        <MailIcon className="h-4 w-4 mr-2" />
                                        Email
                                    </button>

                                    {/* {reservation.status !== "Cancelled" && (
                                        <button
                                            className="inline-flex items-center px-4 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
                                            onClick={() =>
                                                setShowCancelModal(true)
                                            }
                                        >
                                            Cancel Booking
                                        </button>
                                    )} */}
                                </div>
                            </div>
                            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex items-center">
                                        <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                                        <span className="text-sm font-medium text-gray-500">
                                            Dates
                                        </span>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-900">
                                        {(() => {
                                            try {
                                                const travel =
                                                    typeof reservation.travel_details ===
                                                    "string"
                                                        ? JSON.parse(
                                                              reservation.travel_details
                                                          )
                                                        : reservation.travel_details;

                                                return `${
                                                    travel?.start_date || "N/A"
                                                } - ${
                                                    travel?.end_date || "N/A"
                                                }`;
                                            } catch (e) {
                                                console.error(
                                                    "Invalid travel_details JSON",
                                                    e
                                                );
                                                return "N/A - N/A";
                                            }
                                        })()}
                                    </p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex items-center">
                                        <CreditCardIcon className="h-5 w-5 text-gray-400 mr-2" />
                                        <span className="text-sm font-medium text-gray-500">
                                            Payment
                                        </span>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-900">
                                        {reservation.amount
                                            ? `$${parseFloat(
                                                  reservation.amount
                                              ).toFixed(2)}`
                                            : "N/A"}{" "}
                                        - {reservation.payment_options || "N/A"}
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex items-center">
                                        <UsersIcon className="h-5 w-5 text-gray-400 mr-2" />
                                        <span className="text-sm font-medium text-gray-500">
                                            Guests
                                        </span>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-900">
                                        {(() => {
                                            let travelers = "N/A";
                                            try {
                                                const travel =
                                                    typeof reservation.travel_details ===
                                                    "string"
                                                        ? JSON.parse(
                                                              reservation.travel_details
                                                          )
                                                        : reservation.travel_details;
                                                travelers =
                                                    travel?.travelers ?? "N/A";
                                            } catch (e) {
                                                console.error(
                                                    "Invalid travel_details JSON",
                                                    e
                                                );
                                            }
                                            return `${travelers} Persons`;
                                        })()}
                                    </p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex items-center">
                                        <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
                                        <span className="text-sm font-medium text-gray-500">
                                            Status
                                        </span>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-900">
                                        {reservation.status || "N/A"}
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Cancel Modal */}
                        {showCancelModal && (
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
                                        ​
                                    </span>
                                    <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                                        <div>
                                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                                                <XIcon className="h-6 w-6 text-red-600" />
                                            </div>
                                            <div className="mt-3 text-center sm:mt-5">
                                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                                    Cancel Reservation
                                                </h3>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        Are you sure you want to
                                                        cancel this reservation?
                                                        This action cannot be
                                                        undone. You may be
                                                        eligible for a partial
                                                        refund based on our
                                                        cancellation policy.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                            <button
                                                type="button"
                                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:col-start-2 sm:text-sm"
                                                onClick={
                                                    handleCancelReservation
                                                }
                                            >
                                                Cancel Reservation
                                            </button>
                                            <button
                                                type="button"
                                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                                                onClick={() =>
                                                    setShowCancelModal(false)
                                                }
                                            >
                                                Keep Reservation
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default ReservationDetail;
