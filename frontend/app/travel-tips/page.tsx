"use client";
import React, { useState, memo, useEffect } from "react";

import {
    BookOpenIcon,
    ClockIcon,
    TagIcon,
    SearchIcon,
    FilterIcon,
} from "lucide-react";
import Link from "next/link";
import api from "@/lib/api";
const TravelTips = () => {
    const [travelTrips, setTravelTrips] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const categories = [
        ...new Set(travelTrips?.map((tip: TravelTrip) => tip.category)),
    ];

    const fetch = async () => {
        const fetchData = await api.getTravelTips();
        setTravelTrips(fetchData.data);
    };

    useEffect(() => {
        fetch();
    }, []);

    const filteredTips = travelTrips
        .filter(
            (tip: TravelTrip) =>
                tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                tip.content.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(
            (tip: TravelTrip) =>
                selectedCategory === "" || tip.category === selectedCategory
        );
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="bg-blue-700 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-white">
                        Travel Tips & Advice
                    </h1>
                    <p className="mt-2 text-blue-100">
                        Expert guidance to help you travel smarter, safer, and
                        more enjoyably
                    </p>
                    <div className="mt-6">
                        <div className="max-w-3xl mx-auto flex items-center bg-white rounded-lg shadow-md">
                            <div className="pl-4">
                                <SearchIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search for travel tips..."
                                className="flex-grow py-3 px-4 border-none focus:ring-0 rounded-lg"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
                    <button
                        onClick={() => setSelectedCategory("")}
                        className={`px-4 py-2 rounded-full text-sm font-medium ${
                            selectedCategory === ""
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                    >
                        All Categories
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium ${
                                selectedCategory === category
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                {filteredTips.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredTips.map((tip: TravelTrip) => (
                            <div
                                key={tip.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="h-48 overflow-hidden">
                                    <img
                                        src={tip.image}
                                        alt={tip.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center">
                                        <TagIcon className="h-5 w-5 text-blue-500" />
                                        <p className="ml-2 text-sm text-blue-600">
                                            {tip.category}
                                        </p>
                                    </div>
                                    <h3 className="mt-2 text-xl font-medium text-gray-900">
                                        {tip.title}
                                    </h3>
                                    <p className="mt-3 text-base text-gray-500 line-clamp-3">
                                        {tip.content}
                                    </p>
                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <ClockIcon className="h-4 w-4 mr-1" />
                                            {tip.readTime}
                                        </div>
                                        <Link
                                            href={`/travel-tips/${tip.id}`}
                                            className="text-blue-600 hover:text-blue-500 font-medium flex items-center"
                                        >
                                            <BookOpenIcon className="h-4 w-4 mr-1" />
                                            Read more
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <BookOpenIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-lg font-medium text-gray-900">
                            No travel tips found
                        </h3>
                        <p className="mt-1 text-gray-500">
                            Try adjusting your search or filter criteria.
                        </p>
                        <button
                            onClick={() => {
                                setSearchTerm("");
                                setSelectedCategory("");
                            }}
                            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                        >
                            Clear filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
export default TravelTips;
