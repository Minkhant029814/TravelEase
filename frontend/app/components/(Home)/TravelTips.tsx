import React from "react";

import { BookOpenIcon, ClockIcon, TagIcon } from "lucide-react";
import Link from "next/link";
const tips = [
  {
    id: 1,
    title: "Essential Packing Tips for Every Traveler",
    content: "Learn how to pack efficiently and never forget important items.",
    category: "Preparation",
  },
  {
    id: 2,
    title: "How to Find the Best Local Cuisine",
    content: "Discover authentic local food experiences wherever you travel.",
    category: "Food & Dining",
  },
  {
    id: 3,
    title: "Budget Travel Strategies That Work",
    content: "Travel more while spending less with these proven strategies.",
    category: "Budget",
  },
];
const TravelTips = () => {
  return (
    <div className="bg-gray-50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Travel Tips & Advice
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Expert guidance to help you travel smarter, safer, and more
            enjoyably.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {tips.map((tip) => (
            <div
              key={tip.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <TagIcon className="h-5 w-5 text-blue-500" />
                  <p className="ml-2 text-sm text-blue-600">{tip.category}</p>
                </div>
                <h3 className="mt-3 text-lg font-medium text-gray-900">
                  {tip.title}
                </h3>
                <p className="mt-2 text-base text-gray-500">{tip.content}</p>
                <div className="mt-4">
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
        <div className="mt-10 text-center">
          <Link
            href="/travel-tips"
            className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View All Travel Tips
          </Link>
        </div>
      </div>
    </div>
  );
};
export default TravelTips;
