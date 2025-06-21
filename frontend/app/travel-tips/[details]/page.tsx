"use client";

import React from "react";
import {
  ArrowLeftIcon,
  ClockIcon,
  TagIcon,
  ShareIcon,
  BookmarkIcon,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const travelTipsData = [
  {
    id: 1,
    title: "Essential Packing Tips for Every Traveler",
    content: `Learn how to pack efficiently and never forget important items. Start by making a list of essentials based on your destination and trip duration. Roll clothes instead of folding to save space and prevent wrinkles. Use packing cubes to organize items by category. Always pack a basic first aid kit and keep important documents and valuables in your carry-on.
    Key Tips:
    • Create a packing checklist before you start
    • Roll clothes instead of folding them
    • Use packing cubes for organization
    • Keep valuables in your carry-on
    • Pack a basic first aid kit
    • Bring universal adapters for electronics
    • Include emergency contact information
    What to Pack in Your Carry-on:
    1. Important documents (passport, tickets, etc.)
    2. Valuables and electronics
    3. Change of clothes
    4. Basic toiletries
    5. Medications
    6. Chargers and adapters
    Remember to check your airline's baggage restrictions and weather conditions at your destination before packing.`,
    category: "Preparation",
    readTime: "5 min read",
    date: "June 15, 2023",
    author: "Sarah Johnson",
    authorRole: "Travel Expert",
    authorImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    image:
      "https://images.unsplash.com/photo-1581553680321-4fffae59fccd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    relatedTips: [2, 3, 4],
  },
  // More tips...
];

const TravelTipDetail = () => {
  const params = useParams();
  const tip = travelTipsData.find((t) => t.id === Number(params.details));
  if (!tip) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Travel tip not found
          </h2>
          <p className="mt-2 text-gray-500">
            The travel tip you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/travel-tips"
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Back to Travel Tips
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="relative h-96">
        <img
          src={tip.image}
          alt={tip.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black opacity-60"></div>
        <div className="absolute top-0 left-0 right-0 p-6">
          <Link
            href="/travel-tips"
            className="inline-flex items-center text-white hover:text-blue-100"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Travel Tips
          </Link>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg -mt-32 relative z-10 p-6">
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={tip.authorImage}
              alt={tip.author}
              className="h-12 w-12 rounded-full"
            />
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {tip.author}
              </h3>
              <p className="text-sm text-gray-500">{tip.authorRole}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
            <span className="flex items-center">
              <ClockIcon className="h-4 w-4 mr-1" />
              {tip.readTime}
            </span>
            <span className="flex items-center">
              <TagIcon className="h-4 w-4 mr-1" />
              {tip.category}
            </span>
            <span>{tip.date}</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{tip.title}</h1>
          <div className="prose max-w-none">
            {tip.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-600">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <div className="flex space-x-4">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <ShareIcon className="h-4 w-4 mr-2" />
                Share
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <BookmarkIcon className="h-4 w-4 mr-2" />
                Save
              </button>
            </div>
          </div>
        </div>
        {/* Related Tips */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Related Tips
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tip.relatedTips.map((relatedId) => {
              const relatedTip = travelTipsData.find((t) => t.id === relatedId);
              if (!relatedTip) return null;
              return (
                <Link
                  key={relatedTip.id}
                  href={`/travel-tips/${relatedTip.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-center">
                      <TagIcon className="h-5 w-5 text-blue-500" />
                      <p className="ml-2 text-sm text-blue-600">
                        {relatedTip.category}
                      </p>
                    </div>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">
                      {relatedTip.title}
                    </h3>
                    <div className="mt-4 flex items-center text-sm text-gray-500">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      {relatedTip.readTime}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default TravelTipDetail;
