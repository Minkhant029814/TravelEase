"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
    HomeIcon,
    MapPinIcon,
    CalendarIcon,
    UsersIcon,
    LogOutIcon,
    MenuIcon,
    XIcon,
} from "lucide-react";
import { AppHook } from "@/context/AppProvider";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout } = AppHook();

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    const navigation = [
        {
            name: "Dashboard",
            href: "/testingAdmin/dashboard",
            icon: HomeIcon,
        },
        {
            name: "Destinations",
            href: "/testingAdmin/destinations",
            icon: MapPinIcon,
        },
        {
            name: "Bookings",
            href: "/testingAdmin/bookings",
            icon: CalendarIcon,
        },
        {
            name: "Users",
            href: "/testingAdmin/users",
            icon: UsersIcon,
        },
    ];

    return (
        <div className="h-screen flex overflow-hidden bg-gray-100">
            {/* Mobile sidebar */}
            <div
                className={`${
                    sidebarOpen ? "block" : "hidden"
                } md:hidden fixed inset-0 z-40`}
            >
                <div
                    className="fixed inset-0 bg-gray-600 bg-opacity-75"
                    onClick={() => setSidebarOpen(false)}
                ></div>
                <div className="fixed inset-y-0 left-0 flex flex-col max-w-xs w-full bg-white shadow-xl">
                    <div className="h-0 flex-1 flex flex-col overflow-y-auto">
                        <div className="flex items-center justify-between h-16 flex-shrink-0 px-4 bg-blue-600">
                            <div className="flex items-center">
                                <MapPinIcon className="h-8 w-8 text-white" />
                                <span className="ml-2 text-xl font-bold text-white">
                                    TravelEase
                                </span>
                            </div>
                            <button
                                className="h-12 w-12 inline-flex items-center justify-center rounded-md text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                onClick={() => setSidebarOpen(false)}
                            >
                                <XIcon className="h-6 w-6" />
                            </button>
                        </div>
                        <nav className="flex-1 px-2 py-4 bg-white space-y-1">
                            {navigation.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`${
                                            isActive
                                                ? "bg-blue-50 text-blue-600"
                                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <item.icon
                                            className={`${
                                                isActive
                                                    ? "text-blue-600"
                                                    : "text-gray-400 group-hover:text-gray-500"
                                            } mr-4 flex-shrink-0 h-6 w-6`}
                                        />
                                        {item.name}
                                    </Link>
                                );
                            })}
                            <button
                                onClick={handleLogout}
                                className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md w-full"
                            >
                                <LogOutIcon className="text-gray-400 group-hover:text-gray-500 mr-4 flex-shrink-0 h-6 w-6" />
                                Logout
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
            {/* Static sidebar for desktop */}
            <div className="hidden md:flex md:flex-shrink-0">
                <div className="flex flex-col w-64">
                    <div className="flex flex-col h-0 flex-1">
                        <div className="flex items-center h-16 flex-shrink-0 px-4 bg-blue-600">
                            <Link href="/" className="flex items-center">
                                <MapPinIcon className="h-8 w-8 text-white" />
                                <span className="ml-2 text-xl font-bold text-white">
                                    TravelEase
                                </span>
                            </Link>
                        </div>
                        <div className="flex-1 flex flex-col overflow-y-auto">
                            <nav className="flex-1 px-2 py-4 bg-white space-y-1">
                                {navigation.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={`${
                                                isActive
                                                    ? "bg-blue-50 text-blue-600"
                                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                            } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                                        >
                                            <item.icon
                                                className={`${
                                                    isActive
                                                        ? "text-blue-600"
                                                        : "text-gray-400 group-hover:text-gray-500"
                                                } mr-3 flex-shrink-0 h-6 w-6`}
                                            />
                                            {item.name}
                                        </Link>
                                    );
                                })}
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full"
                                >
                                    <LogOutIcon className="text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6" />
                                    Logout
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-0 flex-1 overflow-hidden">
                <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
                    <button
                        type="button"
                        className="px-4 border-r border-gray-200 text-gray-500 md:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <MenuIcon className="h-6 w-6" />
                    </button>
                    <div className="flex-1 px-4 flex justify-between">
                        <div className="flex-1 flex">
                            <h1 className="text-xl font-semibold text-gray-900 self-center">
                                Admin Panel
                            </h1>
                        </div>
                        <div className="ml-4 flex items-center md:ml-6">
                            <div className="flex items-center">
                                {user && (
                                    <>
                                        <div className="hidden md:block">
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                                                    {user.name}
                                                </p>
                                                <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>
                                        <Link
                                            href="/"
                                            className="ml-3 px-3 py-1 text-sm font-medium text-gray-700 hover:text-gray-900"
                                        >
                                            View Site
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <main className="flex-1 relative overflow-y-auto focus:outline-none">
                    <div className="py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
