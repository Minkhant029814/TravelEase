"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import {
    BarChart3Icon,
    UsersIcon,
    MapPinIcon,
    CalendarIcon,
    TrendingUpIcon,
    TrendingDownIcon,
    DollarSignIcon,
    AlertTriangleIcon,
} from "lucide-react";
// import { bookings, destinations, users } from "../mockData";
import AdminLayout from "../Layout";
import { AppHook } from "@/context/AppProvider";
import api from "@/lib/api";

interface Destination {
    id: number;
    name: string;

    sort_by: string;
}

interface User {
    id: number;
    name: string;
}

interface Reservation {
    id: number;
    destination_id: number;
    user_id: number;
    amount: string;
    status: string;
}
const Dashboard = () => {
    // Calculate some statistics for the dashboard

    const [users, setUsers] = React.useState<User[]>([]);
    const [destinations, setDestinations] = React.useState<Destination[]>([]);
    const [reservations, setReservations] = React.useState<Reservation[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [
                    usersResponse,
                    destinationsResponse,
                    reservationsResponse,
                ] = await Promise.all([
                    api.getUsers(),
                    api.getDestinations(),
                    api.getReservations(),
                ]);
                setUsers(usersResponse.data);
                setDestinations(destinationsResponse.data);
                setReservations(reservationsResponse.data);
            } catch (err) {
                setError("Failed to fetch dashboard data");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const { user } = AppHook();
    if (!user || user.role !== "admin") {
        return (
            <div className="flex items-center justify-center h-screen">
                <AlertTriangleIcon className="h-12 w-12 text-red-500" />
                <p className="ml-2 text-lg text-gray-700">
                    You do not have permission to access this page.
                </p>
            </div>
        );
    }
    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-screen">
                    <p className="text-lg text-gray-700">Loading...</p>
                </div>
            </AdminLayout>
        );
    }

    if (error) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-screen">
                    <AlertTriangleIcon className="h-12 w-12 text-red-500" />
                    <p className="ml-2 text-lg text-gray-700">{error}</p>
                </div>
            </AdminLayout>
        );
    }

    const totalUsers = users.length;
    const totalDestinations = destinations.length;
    const totalBookings = reservations.length;
    const totalRevenue = reservations.reduce(
        (sum, reservation) => sum + parseInt(reservation.amount),
        0
    );
    const pendingBookings = reservations.filter(
        (reservation) => reservation.status.toLowerCase() === "pending"
    );
    const destinationCounts = reservations.reduce(
        (acc: { [key: string]: number }, reservation) => {
            acc[reservation.destination_id] =
                (acc[reservation.destination_id] || 0) + 1;
            return acc;
        },
        {}
    );
    const mostPopularDestId = Object.keys(destinationCounts).reduce(
        (a, b) => (destinationCounts[a] > destinationCounts[b] ? a : b),
        Object.keys(destinationCounts)[0] || ""
    );
    const mostPopularDestination = destinations.find(
        (dest) => dest.id === parseInt(mostPopularDestId)
    );
    return (
        <AdminLayout>
            <div className="px-4 py-6 sm:px-0">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Admin Dashboard
                    </h1>
                    <p className="mt-1 text-sm text-gray-600">
                        Overview of your travel business performance and
                        operations.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <CalendarIcon className="h-6 w-6 text-blue-600" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            Total Bookings
                                        </dt>
                                        <dd>
                                            <div className="text-lg font-medium text-gray-900">
                                                {totalBookings}
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-3">
                            <div className="text-sm">
                                <Link
                                    href="/testingAdmin/bookings"
                                    className="font-medium text-blue-700 hover:text-blue-900"
                                >
                                    View all
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <DollarSignIcon className="h-6 w-6 text-green-600" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            Total Revenue
                                        </dt>
                                        <dd>
                                            <div className="text-lg font-medium text-gray-900">
                                                ${totalRevenue.toLocaleString()}
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-3">
                            <div className="flex items-center text-sm">
                                <TrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                                <span className="text-green-600 font-medium">
                                    12% increase
                                </span>
                                <span className="text-gray-500 ml-1">
                                    from last month
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <UsersIcon className="h-6 w-6 text-purple-600" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            Total Users
                                        </dt>
                                        <dd>
                                            <div className="text-lg font-medium text-gray-900">
                                                {totalUsers}
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-3">
                            <div className="text-sm">
                                <Link
                                    href="/testingAdmin/users"
                                    className="font-medium text-blue-700 hover:text-blue-900"
                                >
                                    View all
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <MapPinIcon className="h-6 w-6 text-yellow-600" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            Total Destinations
                                        </dt>
                                        <dd>
                                            <div className="text-lg font-medium text-gray-900">
                                                {totalDestinations}
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-3">
                            <div className="text-sm">
                                <Link
                                    href="/testingAdmin/destinations"
                                    className="font-medium text-blue-700 hover:text-blue-900"
                                >
                                    View all
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">
                    <div className="bg-white shadow rounded-lg">
                        <div className="px-5 py-4 border-b border-gray-200">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Recent Bookings
                            </h3>
                        </div>
                        <div className="p-5">
                            <div className="flow-root">
                                <ul className="divide-y divide-gray-200">
                                    {reservations
                                        .slice(0, 5)
                                        .map((reservation) => {
                                            const destination =
                                                destinations.find(
                                                    (d) =>
                                                        d.id ===
                                                        reservation.destination_id
                                                );
                                            const user = users.find(
                                                (u) =>
                                                    u.id === reservation.user_id
                                            );
                                            return (
                                                <li
                                                    key={reservation.id}
                                                    className="py-4"
                                                >
                                                    <div className="flex items-center space-x-4">
                                                        <div className="flex-shrink-0">
                                                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                                <CalendarIcon className="h-6 w-6 text-gray-500" />
                                                            </div>
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                                {destination?.name ||
                                                                    "Unknown Destination"}
                                                            </p>
                                                            <p className="text-sm text-gray-500 truncate">
                                                                Booked by{" "}
                                                                {user?.name ||
                                                                    "Unknown User"}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <span
                                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                                    reservation.status.toLowerCase() ===
                                                                    "confirmed"
                                                                        ? "bg-green-100 text-green-800"
                                                                        : "bg-yellow-100 text-yellow-800"
                                                                }`}
                                                            >
                                                                {reservation.status
                                                                    .charAt(0)
                                                                    .toUpperCase() +
                                                                    reservation.status.slice(
                                                                        1
                                                                    )}
                                                            </span>
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            $
                                                            {parseFloat(
                                                                reservation.amount
                                                            ).toLocaleString()}
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                </ul>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-3">
                            <div className="text-sm">
                                <Link
                                    href="/admin/bookings"
                                    className="font-medium text-blue-700 hover:text-blue-900"
                                >
                                    View all bookings
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white shadow rounded-lg">
                        <div className="px-5 py-4 border-b border-gray-200">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Business Insights
                            </h3>
                        </div>
                        <div className="p-5">
                            <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <div className="bg-gray-50 overflow-hidden rounded-lg px-4 py-5 sm:p-6">
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        Most Popular Destination
                                    </dt>
                                    <dd className="mt-1 text-lg font-semibold text-gray-900 truncate">
                                        {mostPopularDestination?.name || "N/A"}
                                    </dd>
                                    <dd className="mt-1 text-sm text-gray-500">
                                        {mostPopularDestination?.sort_by || ""}
                                    </dd>
                                </div>
                                <div className="bg-gray-50 overflow-hidden rounded-lg px-4 py-5 sm:p-6">
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        Pending Bookings
                                    </dt>
                                    <dd className="mt-1 text-lg font-semibold text-gray-900">
                                        {pendingBookings.length}
                                    </dd>
                                    {pendingBookings.length > 0 && (
                                        <dd className="mt-1 text-sm text-gray-500 flex items-center">
                                            <AlertTriangleIcon className="h-4 w-4 text-yellow-500 mr-1" />
                                            Requires attention
                                        </dd>
                                    )}
                                </div>
                                <div className="bg-gray-50 overflow-hidden rounded-lg px-4 py-5 sm:p-6">
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        Average Booking Value
                                    </dt>
                                    <dd className="mt-1 text-lg font-semibold text-gray-900">
                                        $
                                        {(totalRevenue / totalBookings).toFixed(
                                            2
                                        )}
                                    </dd>
                                    <dd className="mt-1 text-sm text-gray-500 flex items-center">
                                        <TrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                                        8% increase
                                    </dd>
                                </div>
                                <div className="bg-gray-50 overflow-hidden rounded-lg px-4 py-5 sm:p-6">
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        Conversion Rate
                                    </dt>
                                    <dd className="mt-1 text-lg font-semibold text-gray-900">
                                        3.6%
                                    </dd>
                                    <dd className="mt-1 text-sm text-gray-500 flex items-center">
                                        <TrendingDownIcon className="h-4 w-4 text-red-500 mr-1" />
                                        1.2% decrease
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
                <div className="mt-6 bg-white shadow rounded-lg">
                    <div className="px-5 py-4 border-b border-gray-200">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Revenue Overview
                        </h3>
                    </div>
                    <div className="p-5">
                        <div className="flex items-center justify-center h-64">
                            <div className="text-center">
                                <BarChart3Icon className="h-12 w-12 text-gray-300 mx-auto" />
                                <h3 className="mt-2 text-sm font-medium text-gray-900">
                                    No chart data available
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Charts would be implemented with a charting
                                    library in a real application.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Dashboard;
