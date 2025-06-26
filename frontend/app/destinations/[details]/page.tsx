"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
    MapPinIcon,
    CalendarIcon,
    UsersIcon,
    StarIcon,
    ClockIcon,
    HeartIcon,
    CheckIcon,
} from "lucide-react";

import api from "@/lib/api";
import { AppHook } from "@/context/AppProvider";
import { toast } from "sonner";

const DestinationDetail = () => {
    const params = useParams();
    const id = params?.details as string;
    const [destination, setDestination] = useState(null);
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [travelers, setTravelers] = useState(1);
    const [paymentOption, setPaymentOption] = useState("");
    const [bookingSuccess, setBookingSuccess] = useState(false);
    // Placeholder for auth (replace with actual auth hook, e.g., useAuth())
    const { user } = AppHook(); // TODO: Replace with actual user authentication state

    useEffect(() => {
        if (!id) {
            setLoading(false);
            return;
        }
        setLoading(true);
        api.getDestination(Number(id))
            .then((res) => setDestination(res.data))
            .catch(() => setDestination(null))
            .finally(() => setLoading(false));
    }, [id]);

    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            alert("Please log in to make a booking.");
            return;
        }
        if (!startDate || !endDate) {
            alert("Please select both check-in and check-out dates.");
            return;
        }
        if (new Date(startDate) < new Date(new Date().setHours(0, 0, 0, 0))) {
            alert("Check-in date cannot be in the past.");
            return;
        }
        if (new Date(endDate) <= new Date(startDate)) {
            alert("Check-out date must be after the check-in date.");
            return;
        }
        if (!paymentOption) {
            alert("Please select a payment option.");
            return;
        }

        try {
            const reservationData = {
                destination_id: Number(destination?.id),
                travel_details: {
                    start_date: startDate,
                    end_date: endDate,
                    travelers,
                },
                confirmation_code: "w34244",
                payment_options: paymentOption,
                amount: Math.round(destination?.amount * travelers * 1.1),
            };
            console.log(reservationData);
            const response = await api.createReservation(reservationData);
            setBookingSuccess(true);
            setTimeout(() => {
                setBookingSuccess(false);
                setStartDate("");
                setEndDate("");
                setTravelers(1);
                setPaymentOption("");
            }, 9000); // Reset form after 5 seconds

            toast.success(
                `Booking successful! Confirmation code: ${response.data.confirmation_code}`
            );
        } catch (error) {
            console.error("Reservation failed:", error);
            alert("Failed to create booking. Please try again.");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-gray-500 text-lg">Loading...</div>
            </div>
        );
    }

    if (!destination) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Destination not found
                    </h2>
                    <p className="mt-2 text-gray-500">
                        The destination you're looking for doesn't exist or has
                        been removed.
                    </p>
                    <Link
                        href="/destinations"
                        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                    >
                        Back to destinations
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero section */}
            <div className="relative h-96">
                <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black opacity-50"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center">
                            <MapPinIcon className="h-6 w-6 mr-2" />
                            <h1 className="text-3xl font-bold">
                                {destination.name}
                            </h1>
                        </div>
                        <p className="mt-2 text-lg max-w-3xl">
                            {destination.description}
                        </p>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main content */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                About {destination.name}
                            </h2>
                            <p className="text-gray-600">
                                {destination.longDescription}
                            </p>
                            <div className="mt-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">
                                    Popular Activities
                                </h3>
                                <div className="space-y-6">
                                    {destination.activities.map((activity) => (
                                        <div
                                            key={activity.id}
                                            className="flex flex-col sm:flex-row bg-gray-50 rounded-lg overflow-hidden"
                                        >
                                            <div className="sm:w-1/3">
                                                <img
                                                    src={activity.image}
                                                    alt={activity.name}
                                                    className="h-48 w-full object-cover"
                                                />
                                            </div>
                                            <div className="p-4 sm:w-2/3">
                                                <h4 className="text-lg font-medium text-gray-900">
                                                    {activity.name}
                                                </h4>
                                                <p className="mt-2 text-gray-600">
                                                    {activity.description}
                                                </p>
                                                <div className="mt-4">
                                                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200">
                                                        Learn more
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">
                                    Reviews
                                </h3>
                                <div className="space-y-10 max-w-3xl mx-auto">
                                    {destination.reviews.map((review) => (
                                        <div
                                            key={review.id}
                                            className="border border-gray-100 rounded-xl p-6 bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                                        >
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                                <h4 className="text-xl font-bold text-gray-900 tracking-tight">
                                                    {destination.user.name}
                                                </h4>
                                                <span className="text-sm text-gray-500 font-medium italic">
                                                    {review.date}
                                                </span>
                                            </div>

                                            <div className="flex items-center mt-3 space-x-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <StarIcon
                                                        key={i}
                                                        className={`h-6 w-6 ${
                                                            i < review.rating
                                                                ? "text-amber-400 fill-current"
                                                                : "text-gray-200"
                                                        } transform transition-transform duration-200 hover:scale-110`}
                                                        aria-hidden="true"
                                                    />
                                                ))}
                                            </div>
                                            <p className="mt-4 text-gray-700 text-base leading-relaxed">
                                                {review.comment}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6">
                                    <button className="text-blue-600 hover:text-blue-500 font-medium">
                                        View all reviews
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">
                                Plan Your Trip
                            </h2>
                            <div className="mb-4">
                                <span className="text-2xl font-bold text-blue-600">
                                    ${destination.amount}
                                </span>
                                <span className="text-gray-600 text-sm">
                                    {" "}
                                    / person
                                </span>
                            </div>
                            {bookingSuccess ? (
                                <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <CheckIcon className="h-5 w-5 text-green-400" />
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="text-sm font-medium text-green-800">
                                                Booking Request Received
                                            </h3>
                                            <div className="mt-2 text-sm text-green-700">
                                                <p>
                                                    Thank you for your booking
                                                    request. We'll confirm your
                                                    reservation shortly.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <form
                                    onSubmit={handleBooking}
                                    className="space-y-4"
                                >
                                    <div>
                                        <label
                                            htmlFor="start-date"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Check-in Date
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <CalendarIcon className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="date"
                                                id="start-date"
                                                value={startDate}
                                                onChange={(e) =>
                                                    setStartDate(e.target.value)
                                                }
                                                className="pl-10 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                required
                                                min={
                                                    new Date()
                                                        .toISOString()
                                                        .split("T")[0]
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="end-date"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Check-out Date
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <CalendarIcon className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="date"
                                                id="end-date"
                                                value={endDate}
                                                onChange={(e) =>
                                                    setEndDate(e.target.value)
                                                }
                                                className="pl-10 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                required
                                                min={
                                                    startDate
                                                        ? new Date(
                                                              new Date(
                                                                  startDate
                                                              ).getTime() +
                                                                  86400000
                                                          )
                                                              .toISOString()
                                                              .split("T")[0]
                                                        : undefined
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="travelers"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Number of Travelers
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <UsersIcon className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <select
                                                id="travelers"
                                                value={travelers}
                                                onChange={(e) =>
                                                    setTravelers(
                                                        Number(e.target.value)
                                                    )
                                                }
                                                className="pl-10 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                required
                                            >
                                                {[1, 2, 3, 4, 5, 6, 7, 8].map(
                                                    (num) => (
                                                        <option
                                                            key={num}
                                                            value={num}
                                                        >
                                                            {num}{" "}
                                                            {num === 1
                                                                ? "traveler"
                                                                : "travelers"}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="payment-option"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Payment Option
                                        </label>
                                        <select
                                            id="payment-option"
                                            value={paymentOption}
                                            onChange={(e) =>
                                                setPaymentOption(e.target.value)
                                            }
                                            className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            required
                                        >
                                            <option value="">
                                                Select payment option
                                            </option>
                                            <option value="credit_card">
                                                Credit Card
                                            </option>
                                            <option value="paypal">
                                                PayPal
                                            </option>
                                            <option value="bank_transfer">
                                                Bank Transfer
                                            </option>
                                        </select>
                                    </div>
                                    {startDate && endDate && (
                                        <div className="border-t border-gray-200 pt-4">
                                            <div className="flex justify-between mb-2">
                                                <span className="text-gray-600">
                                                    ${destination.amount} x{" "}
                                                    {travelers} traveler
                                                    {travelers !== 1 ? "s" : ""}
                                                </span>
                                                <span className="font-medium">
                                                    $
                                                    {destination.amount *
                                                        travelers}
                                                </span>
                                            </div>
                                            <div className="flex justify-between mb-2">
                                                <span className="text-gray-600">
                                                    Service fee
                                                </span>
                                                <span className="font-medium">
                                                    $
                                                    {Math.round(
                                                        destination.amount *
                                                            travelers *
                                                            0.1
                                                    )}
                                                </span>
                                            </div>
                                            <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-2 mt-2">
                                                <span>Total</span>
                                                <span>
                                                    $
                                                    {Math.round(
                                                        destination.amount *
                                                            travelers *
                                                            1.1
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                    <button
                                        type="submit"
                                        className={`w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                                            user
                                                ? "hover:bg-blue-700"
                                                : "opacity-50 cursor-not-allowed"
                                        }`}
                                        disabled={!user}
                                    >
                                        {user ? "Book Now" : "Login to Book"}
                                    </button>
                                    {!user && (
                                        <p className="text-sm text-gray-500 text-center mt-2">
                                            <Link
                                                href="/login"
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                Log in
                                            </Link>{" "}
                                            to make a booking
                                        </p>
                                    )}
                                </form>
                            )}
                            <div className="mt-6 border-t border-gray-200 pt-4">
                                <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                    <HeartIcon className="h-5 w-5 mr-2 text-red-500" />
                                    Save to Wishlist
                                </button>
                            </div>
                            <div className="mt-6 border-t border-gray-200 pt-4">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    Travel Tips
                                </h3>
                                <ul className="space-y-3">
                                    <li className="flex items-center">
                                        <ClockIcon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                                        <span className="text-sm text-gray-600">
                                            Best time to visit: April to October
                                        </span>
                                    </li>
                                    <li className="flex items-center">
                                        <ClockIcon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                                        <span className="text-sm text-gray-600">
                                            Recommended stay: 5-7 days
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-6 border-t border-gray-200 pt-4">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    Need Help?
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Our travel experts can help you plan the
                                    perfect trip.
                                </p>
                                <Link
                                    href="/support"
                                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 w-full justify-center"
                                >
                                    Contact Support
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DestinationDetail;
