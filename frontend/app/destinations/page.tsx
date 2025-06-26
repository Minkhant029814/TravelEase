"use client";
import React, { useEffect, useState } from "react";

import {
    MapPinIcon,
    SearchIcon,
    FilterIcon,
    SortAscIcon,
    Cookie,
} from "lucide-react";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Destinations = () => {
    const [destinationsData, setDestinationsData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState("name");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = Cookies.get("authToken");
        const fetchDestinations = async () => {
            try {
                const res = await axios.get(`${API_URL}/destinations`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(res.data);

                const data = res.data.map((dest: any) => ({
                    id: dest.id,
                    name: dest.name,
                    description: dest.description,
                    image: dest.image,

                    activities: dest.activities
                        ? dest.activities.map((a: any) => a.name)
                        : [],
                }));
                setDestinationsData(data);
            } catch (error) {
                setDestinationsData([]);
            } finally {
                setLoading(false);
            }
        };
        fetchDestinations();
    }, []);

    const allActivities = [
        ...new Set(destinationsData.flatMap((dest: any) => dest.activities)),
    ];
    const filteredDestinations = destinationsData
        .filter(
            (destination: any) =>
                destination.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                destination.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
        )
        .filter(
            (destination: any) =>
                selectedActivities.length === 0 ||
                destination.activities.some((activity: string) =>
                    selectedActivities.includes(activity)
                )
        )
        .sort((a: any, b: any) => a[sortBy].localeCompare(b[sortBy]));
    const handleActivityToggle = (activity: string) => {
        setSelectedActivities((prev) =>
            prev.includes(activity)
                ? prev.filter((a) => a !== activity)
                : [...prev, activity]
        );
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="bg-blue-700 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-white">
                        Explore Destinations
                    </h1>
                    <p className="mt-2 text-blue-100">
                        Discover amazing places around the world
                    </p>
                    <div className="mt-6">
                        <div className="max-w-3xl mx-auto flex items-center bg-white rounded-lg shadow-md">
                            <div className="pl-4">
                                <SearchIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search destinations..."
                                className="flex-grow py-3 px-4 border-none focus:ring-0 rounded-lg"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Filters sidebar */}
                    <div className="md:w-64 flex-shrink-0">
                        <div className="bg-white p-4 rounded-lg shadow">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-medium text-gray-900 flex items-center">
                                    <FilterIcon className="h-5 w-5 mr-2 text-blue-500" />
                                    Filters
                                </h2>
                                <button
                                    onClick={() => setSelectedActivities([])}
                                    className="text-sm text-blue-600 hover:text-blue-500"
                                >
                                    Clear all
                                </button>
                            </div>
                            <div className="border-t border-gray-200 pt-4">
                                <h3 className="text-sm font-medium text-gray-900 mb-2">
                                    Activities
                                </h3>
                                <div className="space-y-2">
                                    {allActivities.map((activity, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center"
                                        >
                                            <input
                                                id={`activity-${activity}`}
                                                name={`activity-${activity}`}
                                                type="checkbox"
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                checked={selectedActivities.includes(
                                                    activity
                                                )}
                                                onChange={() =>
                                                    handleActivityToggle(
                                                        activity
                                                    )
                                                }
                                            />
                                            <label
                                                htmlFor={`activity-${activity}`}
                                                className="ml-3 text-sm text-gray-600"
                                            >
                                                {activity}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="border-t border-gray-200 pt-4 mt-4">
                                <h3 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                                    <SortAscIcon className="h-5 w-5 mr-2 text-blue-500" />
                                    Sort By
                                </h3>
                                <select
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="name">Name (A-Z)</option>
                                    <option value="description">
                                        Description
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {/* Destinations grid */}
                    <div className="flex-1">
                        <div className="mb-6 flex justify-between items-center">
                            <h2 className="text-xl font-medium text-gray-900">
                                {filteredDestinations.length}{" "}
                                {filteredDestinations.length === 1
                                    ? "Destination"
                                    : "Destinations"}{" "}
                                Found
                            </h2>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredDestinations.map((destination: any) => (
                                <Link
                                    key={destination.id}
                                    href={`/destinations/${destination.id}`}
                                    className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                                >
                                    <div className="aspect-w-16 aspect-h-9">
                                        <img
                                            src={destination.image}
                                            alt={destination.name}
                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center">
                                            <MapPinIcon className="h-5 w-5 text-blue-500" />
                                            <h3 className="ml-2 text-lg font-medium text-gray-900">
                                                {destination.name}
                                            </h3>
                                        </div>
                                        <p className="mt-2 text-sm text-gray-500">
                                            {destination.description}
                                        </p>
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {destination.activities.map(
                                                (
                                                    activity: string,
                                                    index: number
                                                ) => (
                                                    <span
                                                        key={index}
                                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                                    >
                                                        {activity}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                        <div className="mt-4">
                                            <span className="text-sm font-medium text-blue-600 group-hover:text-blue-500">
                                                View details →
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        {filteredDestinations.length === 0 && (
                            <div className="bg-white p-8 rounded-lg shadow text-center">
                                <h3 className="text-lg font-medium text-gray-900">
                                    No destinations found
                                </h3>
                                <p className="mt-2 text-gray-500">
                                    Try adjusting your search or filters
                                </p>
                                <button
                                    onClick={() => {
                                        setSearchTerm("");
                                        setSelectedActivities([]);
                                    }}
                                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Destinations;
