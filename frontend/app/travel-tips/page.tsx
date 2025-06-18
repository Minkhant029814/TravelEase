"use client";
import React, { useState, memo } from "react";

import {
  BookOpenIcon,
  ClockIcon,
  TagIcon,
  SearchIcon,
  FilterIcon,
} from "lucide-react";
import Link from "next/link";
const travelTipsData = [
  {
    id: 1,
    title: "Essential Packing Tips for Every Traveler",
    content:
      "Learn how to pack efficiently and never forget important items. Start by making a list of essentials based on your destination and trip duration. Roll clothes instead of folding to save space and prevent wrinkles. Use packing cubes to organize items by category. Always pack a basic first aid kit and keep important documents and valuables in your carry-on.",
    category: "Preparation",
    readTime: "5 min read",
    date: "June 15, 2023",
    image:
      "https://images.unsplash.com/photo-1581553680321-4fffae59fccd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 2,
    title: "How to Find the Best Local Cuisine",
    content:
      "Discover authentic local food experiences wherever you travel. Research traditional dishes before you arrive. Ask hotel staff or local residents for recommendations instead of relying solely on tourist guides. Look for restaurants filled with locals rather than tourists. Consider taking a food tour early in your trip to get oriented. Visit local markets to sample fresh ingredients and street food.",
    category: "Food & Dining",
    readTime: "4 min read",
    date: "May 28, 2023",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 3,
    title: "Budget Travel Strategies That Work",
    content:
      "Travel more while spending less with these proven strategies. Book flights 2-3 months in advance and use incognito mode when searching. Consider traveling during shoulder seasons for lower prices and fewer crowds. Use public transportation instead of taxis. Look into city passes that combine multiple attractions. Stay in accommodations with kitchen access to save on meal costs.",
    category: "Budget",
    readTime: "6 min read",
    date: "April 10, 2023",
    image:
      "https://images.unsplash.com/photo-1580458148391-8c4951dc1465?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
  },
  {
    id: 4,
    title: "Staying Safe While Traveling Solo",
    content:
      "Essential safety tips for solo travelers around the world. Research your destination thoroughly before arrival. Share your itinerary with family or friends. Keep digital copies of important documents. Trust your instincts and be aware of common scams in the area. Consider joining group tours for certain activities. Stay in well-reviewed accommodations in safe neighborhoods.",
    category: "Safety",
    readTime: "7 min read",
    date: "March 5, 2023",
    image:
      "https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1746&q=80",
  },
  {
    id: 5,
    title: "How to Beat Jet Lag Naturally",
    content:
      "Practical strategies to minimize jet lag and enjoy your trip from day one. Start adjusting your sleep schedule a few days before departure. Stay hydrated before, during, and after your flight. Avoid alcohol and caffeine on the plane. Get exposure to natural sunlight at your destination. Take short naps (20-30 minutes) if needed, but try to stay awake until the local bedtime.",
    category: "Health",
    readTime: "5 min read",
    date: "February 18, 2023",
    image:
      "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 6,
    title: "Photography Tips for Travelers",
    content:
      "Capture stunning travel memories with these photography techniques. Wake up early to catch the golden hour light and avoid crowds. Research photo spots before you arrive but also explore off the beaten path. Learn the basic rules of composition like the rule of thirds. Include people in some shots to add scale and storytelling. Back up your photos regularly while traveling.",
    category: "Photography",
    readTime: "8 min read",
    date: "January 25, 2023",
    image:
      "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1744&q=80",
  },
];
const categories = [...new Set(travelTipsData.map((tip) => tip.category))];
const TravelTips = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const filteredTips = travelTipsData
    .filter(
      (tip) =>
        tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tip.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (tip) => selectedCategory === "" || tip.category === selectedCategory
    );
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-blue-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">
            Travel Tips & Advice
          </h1>
          <p className="mt-2 text-blue-100">
            Expert guidance to help you travel smarter, safer, and more
            enjoyably
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
            {filteredTips.map((tip) => (
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
                    <p className="ml-2 text-sm text-blue-600">{tip.category}</p>
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
