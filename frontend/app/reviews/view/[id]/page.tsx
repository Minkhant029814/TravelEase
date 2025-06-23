"use client";
import React, { useEffect, useState } from "react";
import {
    StarIcon,
    CalendarIcon,
    PencilIcon,
    TrashIcon,
    ArrowLeftIcon,
    AlertCircleIcon,
    MapPinIcon,
    ClockIcon,
} from "lucide-react";
import Link from "next/link";
import api from "@/lib/api";
import { useParams } from "next/navigation";

const ViewReview = () => {
    const [review, setReview] = useState<any[]>([]);
    const [destination, setDestination] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const params = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const reviewResponse = await api.getReviewsByReservationId(
                    Number(params.id)
                );
                setReview(reviewResponse.data);

                // Fetch destination data for the first review
                if (reviewResponse.data.length > 0) {
                    const destinationResponse = await api.getDestination(
                        Number(reviewResponse.data[0].destination_id)
                    );
                    setDestination(destinationResponse.data);
                }
            } catch (err) {
                setError("Failed to load review data");
                console.error("Error fetching review:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params.id]);

    const handleDelete = async (id: number) => {
        if (confirm("Are you sure you want to delete this review?")) {
            try {
                await api.deleteReview(id);
                // Redirect to reservations page or show success message
                window.location.href = "/reservations";
            } catch (err) {
                setError("Failed to delete review");
                console.error("Error deleting review:", err);
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
                    <div className="text-red-500 mb-4">
                        <AlertCircleIcon className="h-10 w-10 mx-auto" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                        Error
                    </h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <Link
                        href="/reservations"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                    >
                        <ArrowLeftIcon className="h-4 w-4 mr-2" />
                        Back to Reservations
                    </Link>
                </div>
            </div>
        );
    }

    if (!review || review.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                        Review Not Found
                    </h2>
                    <p className="text-gray-600 mb-4">
                        The review you're looking for doesn't exist.
                    </p>
                    <Link
                        href="/reservations"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                    >
                        <ArrowLeftIcon className="h-4 w-4 mr-2" />
                        Back to Reservations
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <Link
                        href="/reservations"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 mb-4"
                    >
                        <ArrowLeftIcon className="h-5 w-5 mr-1" />
                        Back to Reservations
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Your Reviews
                    </h1>
                    <p className="text-gray-500 mt-2">
                        {review.length} review{review.length !== 1 ? "s" : ""}{" "}
                        for this destination
                    </p>
                </div>

                {/* Destination Card */}
                {destination && (
                    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                        <div className="md:flex">
                            <div className="md:w-1/3">
                                <img
                                    src={destination.image}
                                    alt={destination.name}
                                    className="w-full h-48 md:h-full object-cover"
                                />
                            </div>
                            <div className="p-6 md:w-2/3">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    {destination.name}
                                </h2>
                                <div className="flex items-center text-gray-600 mb-4">
                                    <MapPinIcon className="h-5 w-5 mr-2 text-gray-400" />
                                    <span>{destination.location}</span>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {destination.tags?.map(
                                        (tag: string, index: number) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                            >
                                                {tag}
                                            </span>
                                        )
                                    )}
                                </div>
                                <p className="text-gray-600">
                                    {destination.description}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Reviews List */}
                <div className="space-y-6">
                    {review.map((r, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-md overflow-hidden"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {r.title}
                                        </h3>
                                        <div className="flex items-center mt-1">
                                            <div className="flex">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <StarIcon
                                                        key={star}
                                                        className={`h-5 w-5 ${
                                                            star <= r.rating
                                                                ? "text-yellow-400 fill-current"
                                                                : "text-gray-300"
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="ml-2 text-sm text-gray-500">
                                                {new Date(
                                                    r.created_at
                                                ).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Link
                                            href={`/reviews/edit/${r.id}`}
                                            className="p-2 text-gray-500 hover:text-blue-600 transition-colors duration-200"
                                            title="Edit"
                                        >
                                            <PencilIcon className="h-5 w-5" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(r.id)}
                                            className="p-2 text-gray-500 hover:text-red-600 transition-colors duration-200"
                                            title="Delete"
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>

                                <p className="text-gray-600 whitespace-pre-line mb-4">
                                    {r.comment}
                                </p>

                                {/* Review Images */}
                                {r.images && r.images.length > 0 && (
                                    <div className="mt-4">
                                        <h4 className="text-sm font-medium text-gray-900 mb-2">
                                            Photos
                                        </h4>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                            {r.images.map(
                                                (
                                                    image: string,
                                                    imgIndex: number
                                                ) => (
                                                    <div
                                                        key={imgIndex}
                                                        className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden"
                                                    >
                                                        <img
                                                            src={image}
                                                            alt={`Review ${
                                                                index + 1
                                                            } - ${
                                                                imgIndex + 1
                                                            }`}
                                                            className="object-cover w-full h-full"
                                                        />
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ViewReview;
