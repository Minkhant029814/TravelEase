"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  MapPinIcon,
  CalendarIcon,
  UsersIcon,
  StarIcon,
  ClockIcon,
  HeartIcon,
} from "lucide-react";

const destinationsData = {
  1: {
    id: 1,
    name: "Bali, Indonesia",
    description:
      "Tropical paradise with beautiful beaches and rich cultural heritage.",
    longDescription:
      "Bali is an Indonesian island known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs. The island is home to religious sites such as cliffside Uluwatu Temple. To the south, the beachside city of Kuta has lively bars, while Seminyak, Sanur and Nusa Dua are popular resort towns. The island is also known for its yoga and meditation retreats.",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80",
    activities: [
      {
        id: 1,
        name: "Beach Day at Kuta",
        description:
          "Relax on the famous Kuta Beach with golden sands and surfing opportunities.",
        image:
          "https://images.unsplash.com/photo-1588625500633-a0cd518f0f60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      },
      {
        id: 2,
        name: "Ubud Monkey Forest",
        description:
          "Visit the sacred sanctuary with over 700 monkeys and ancient temples.",
        image:
          "https://images.unsplash.com/photo-1584555613483-3b107aa8ba23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      },
      {
        id: 3,
        name: "Tegallalang Rice Terraces",
        description:
          "Explore the stunning stepped rice fields using traditional Balinese irrigation.",
        image:
          "https://images.unsplash.com/photo-1558005530-a7958896ec60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80",
      },
    ],
    reviews: [
      {
        id: 1,
        user: "Sarah M.",
        rating: 5,
        comment:
          "Absolutely stunning! The beaches were pristine and the locals were so friendly.",
        date: "2 months ago",
      },
      {
        id: 2,
        user: "James L.",
        rating: 4,
        comment:
          "Beautiful island with so much to see. The traffic can be challenging though.",
        date: "5 months ago",
      },
    ],
  },
  // More destinations would be here in a real app
};

const DestinationDetail = () => {
  const params = useParams();
  const id = params?.details as string;
  const [selectedDate, setSelectedDate] = useState("");
  const [travelers, setTravelers] = useState(2);
  // In a real app, we'd fetch this data from an API based on the ID
  const destination = destinationsData[id];
  if (!destination) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Destination not found
          </h2>
          <p className="mt-2 text-gray-500">
            The destination you're looking for doesn't exist or has been
            removed.
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
              <h1 className="text-3xl font-bold">{destination.name}</h1>
            </div>
            <p className="mt-2 text-lg max-w-3xl">{destination.description}</p>
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
              <p className="text-gray-600">{destination.longDescription}</p>
              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Popular Activities
                </h3>
                <div className="space-y-6">
                  {destination.activities.map((activity: any) => (
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
                <div className="space-y-4">
                  {destination.reviews.map((review: any) => (
                    <div
                      key={review.id}
                      className="border-b border-gray-200 pb-4"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-medium text-gray-900">
                          {review.user}
                        </h4>
                        <span className="text-sm text-gray-500">
                          {review.date}
                        </span>
                      </div>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-5 w-5 ${
                              i < review.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="mt-2 text-gray-600">{review.comment}</p>
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
              <form>
                <div className="mb-4">
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    When do you want to go?
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CalendarIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      id="date"
                      className="pl-10 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="travelers"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Number of travelers
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UsersIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="travelers"
                      className="pl-10 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      value={travelers}
                      onChange={(e) => setTravelers(Number(e.target.value))}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "traveler" : "travelers"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Check Availability
                </button>
              </form>
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
                  <li className="flex">
                    <ClockIcon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-600">
                      Best time to visit: April to October
                    </span>
                  </li>
                  <li className="flex">
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
                  Our travel experts can help you plan the perfect trip.
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
