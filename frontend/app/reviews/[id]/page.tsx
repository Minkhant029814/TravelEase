"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  StarIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  FlagIcon,
  UserIcon,
  CalendarIcon,
} from "lucide-react";

const reviewData = {
  1: {
    id: 1,
    destination: "Rome, Italy",
    hotel: "Grand Hotel Roma",
    dates: "March 5-12, 2023",
    author: {
      name: "Sarah Johnson",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      trips: 12,
    },
    rating: 5,
    title: "Absolutely amazing experience in Rome!",
    review: `Our stay at the Grand Hotel Roma was nothing short of spectacular. From the moment we arrived, the staff made us feel like royalty. The location is perfect - just steps away from major attractions while still offering a quiet retreat.
    The room was spacious, immaculately clean, and offered stunning views of the city. The bed was incredibly comfortable, and the bathroom was modern and luxurious. The attention to detail in every aspect of the room was impressive.
    The hotel's restaurant deserves special mention - the breakfast buffet was extensive and delicious, and the dinner we had there was one of the best meals of our entire trip. The chef's special pasta dishes were outstanding.
    What really sets this hotel apart is the staff. They went above and beyond to make our stay memorable, from arranging skip-the-line tickets to providing excellent local recommendations that helped us experience Rome like locals.`,
    date: "March 15, 2023",
    images: [
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1996&q=80",
      "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      "https://images.unsplash.com/photo-1549877452-9c387954fbc2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    ],
    categories: ["Location", "Cleanliness", "Service", "Value for Money"],
    helpfulVotes: 24,
    unhelpfulVotes: 2,
  },
};

const Review = () => {
  const params = useParams();
  const id = params?.id as string;
  const review = reviewData[id];

  if (!review) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Review not found</h2>
          <p className="mt-2 text-gray-500">
            The review you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/reservations/history"
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Back to History
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Review Header */}
          <div className="relative h-64">
            <img
              src={review.images[0]}
              alt={review.destination}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black opacity-60"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h1 className="text-3xl font-bold">{review.destination}</h1>
              <p className="mt-2 text-lg">{review.hotel}</p>
            </div>
          </div>
          {/* Review Content */}
          <div className="p-6">
            {/* Author Info */}
            <div className="flex items-center mb-6">
              {review.author.image ? (
                <img
                  src={review.author.image}
                  alt={review.author.name}
                  className="h-12 w-12 rounded-full"
                />
              ) : (
                <UserIcon className="h-12 w-12 text-gray-400" />
              )}
              <div className="ml-4">
                <h2 className="text-lg font-medium text-gray-900">
                  {review.author.name}
                </h2>
                <p className="text-sm text-gray-500">
                  {review.author.trips} trips
                </p>
              </div>
            </div>
            {/* Rating and Date */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-5 w-5 ${
                      i < review.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <CalendarIcon className="h-4 w-4 mr-1" />
                {review.date}
              </div>
            </div>
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-6">
              {review.categories.map((category, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                >
                  {category}
                </span>
              ))}
            </div>
            {/* Review Title and Content */}
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {review.title}
            </h3>
            <div className="prose max-w-none mb-6">
              {review.review.split("\n\n").map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-600">
                  {paragraph}
                </p>
              ))}
            </div>
            {/* Review Images */}
            {review.images.length > 1 && (
              <div className="grid grid-cols-3 gap-4 mb-6">
                {review.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Review image ${index + 1}`}
                    className="rounded-lg object-cover w-full h-48"
                  />
                ))}
              </div>
            )}
            {/* Helpful Buttons */}
            <div className="flex items-center justify-between border-t border-gray-200 pt-6">
              <div className="flex space-x-4">
                <button className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                  <ThumbsUpIcon className="h-4 w-4 mr-2" />
                  Helpful ({review.helpfulVotes})
                </button>
                <button className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                  <ThumbsDownIcon className="h-4 w-4 mr-2" />
                  Not Helpful ({review.unhelpfulVotes})
                </button>
              </div>
              <button className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                <FlagIcon className="h-4 w-4 mr-2" />
                Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
