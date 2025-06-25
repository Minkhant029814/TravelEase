"use client";
import React, { useState, useEffect, useRef } from "react";
import { PlusIcon, PencilIcon, TrashIcon, StarIcon, XIcon } from "lucide-react";
import AdminLayout from "../Layout";
import api from "@/lib/api";
import { AppHook } from "@/context/AppProvider";

interface Activity {
    id: number;
    name: string;
    image: string | null;
    destination_id: number;
}

interface Review {
    id: number;
    rating: number;
}

interface User {
    id: number;
    name: string;
}

interface Destination {
    id: number;
    name: string;
    sort_by: string;
    description: string;
    amount: number;
    image: string | null;
    user_id: number;
    user: User;
    activities: Activity[];
    reviews: Review[];
}

const AdminDestinations = () => {
    const [destinationList, setDestinationList] = useState<Destination[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentDestination, setCurrentDestination] =
        useState<Destination | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        sort_by: "",
        description: "",
        image: null as File | null,
        user_id: 0,
        amount: 0,
        activities: [{ id: 0, name: "", image: null as File | null }],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = AppHook();
    const addModalRef = useRef<HTMLDivElement>(null);
    const editModalRef = useRef<HTMLDivElement>(null);
    const deleteModalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                setLoading(true);
                const response = await api.getDestinations();
                setDestinationList(response.data);
            } catch (err) {
                setError("Failed to fetch destinations");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchDestinations();
    }, []);

    useEffect(() => {
        if (isAddModalOpen && addModalRef.current) {
            const firstInput = addModalRef.current.querySelector(
                "input, textarea"
            ) as HTMLInputElement | HTMLTextAreaElement | null;
            firstInput?.focus();
        }
        if (isEditModalOpen && editModalRef.current) {
            const firstInput = editModalRef.current.querySelector(
                "input, textarea"
            ) as HTMLInputElement | HTMLTextAreaElement | null;
            firstInput?.focus();
        }
        if (isDeleteModalOpen && deleteModalRef.current) {
            const firstButton = deleteModalRef.current.querySelector(
                "button"
            ) as HTMLButtonElement | null;
            firstButton?.focus();
        }
    }, [isAddModalOpen, isEditModalOpen, isDeleteModalOpen]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData({
            ...formData,
            image: file,
        });
    };

    const handleActivityChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number,
        field: "name" | "image"
    ) => {
        const newActivities = [...formData.activities];
        if (field === "name") {
            newActivities[index].name = e.target.value;
        } else if (field === "image") {
            newActivities[index].image = e.target.files?.[0] || null;
        }
        setFormData({
            ...formData,
            activities: newActivities,
        });
    };

    const addActivity = () => {
        setFormData({
            ...formData,
            activities: [
                ...formData.activities,
                { id: 0, name: "", image: null },
            ],
        });
    };

    const removeActivity = (index: number) => {
        const newActivities = formData.activities.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            activities:
                newActivities.length > 0
                    ? newActivities
                    : [{ id: 0, name: "", image: null }],
        });
    };

    const openAddModal = () => {
        setFormData({
            name: "",
            sort_by: "",
            description: "",
            amount: 0,
            image: null,
            user_id: user?.id || 0,
            activities: [{ id: 0, name: "", image: null }],
        });
        setIsAddModalOpen(true);
    };

    const openEditModal = (destination: Destination) => {
        setCurrentDestination(destination);
        setFormData({
            name: destination.name,
            sort_by: destination.sort_by,
            description: destination.description,
            amount: destination.amount,
            image: null,
            user_id: destination.user_id,
            activities:
                destination.activities.length > 0
                    ? destination.activities.map((act) => ({
                          id: act.id,
                          name: act.name,
                          image: null,
                      }))
                    : [{ id: 0, name: "", image: null }],
        });
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (destination: Destination) => {
        setCurrentDestination(destination);
        setIsDeleteModalOpen(true);
    };

    const handleAddDestination = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setError(null);
            const formDataToSend = new FormData();
            formDataToSend.append("name", formData.name);
            formDataToSend.append("sort_by", formData.sort_by);
            formDataToSend.append("description", formData.description);
            formDataToSend.append("user_id", formData.user_id.toString());
            formDataToSend.append("amount", formData.amount.toString());
            if (formData.image) {
                formDataToSend.append("image", formData.image);
            }

            // Create destination
            const newDestination = await api.createDestination(formDataToSend);

            if (!newDestination || !newDestination.id) {
                throw new Error(
                    "Failed to create destination: Invalid response"
                );
            }

            // Create activities
            const filteredActivities = formData.activities.filter(
                (act) => act.name.trim() !== ""
            );
            console.log("Activities to create:", filteredActivities); // Debug log
            for (const activity of filteredActivities) {
                const activityFormData = new FormData();
                activityFormData.append(
                    "destination_id",
                    newDestination.id.toString()
                );
                activityFormData.append("name", activity.name);
                if (activity.image) {
                    activityFormData.append("image", activity.image);
                }
                try {
                    await api.createActivity(activityFormData);
                } catch (activityErr: any) {
                    console.error(
                        `Failed to create activity "${activity.name}":`,
                        activityErr
                    );
                    throw new Error(
                        `Failed to create activity "${activity.name}": ${
                            activityErr.message || "Unknown error"
                        }`
                    );
                }
            }

            // Refresh destination list
            const updatedDestinations = await api.getDestinations();
            setDestinationList(updatedDestinations.data);
            setIsAddModalOpen(false);
        } catch (err: any) {
            const errorMessage =
                err.response?.data?.message ||
                err.message ||
                "Failed to add destination or activities";
            setError(errorMessage);
            console.error("Error in handleAddDestination:", err);
        }
    };

    const handleEditDestination = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentDestination) return;
        try {
            setError(null);
            // Update destination
            const formDataToSend = new FormData();
            formDataToSend.append("name", formData.name);
            formDataToSend.append("sort_by", formData.sort_by);
            formDataToSend.append("description", formData.description);
            formDataToSend.append("user_id", formData.user_id.toString());
            if (formData.image) {
                formDataToSend.append("image", formData.image);
            }
            await api.updateDestination(currentDestination.id, formDataToSend);

            // Handle activities
            const filteredActivities = formData.activities.filter(
                (act) => act.name.trim() !== ""
            );
            for (const activity of filteredActivities) {
                const activityFormData = new FormData();
                activityFormData.append(
                    "destination_id",
                    currentDestination.id.toString()
                );
                activityFormData.append("name", activity.name);
                if (activity.image) {
                    activityFormData.append("image", activity.image);
                }
                if (activity.id) {
                    await api.updateActivity(activity.id, activityFormData);
                } else {
                    await api.createActivity(activityFormData);
                }
            }

            // Refresh destination list
            const updatedDestinations = await api.getDestinations();
            setDestinationList(updatedDestinations.data);
            setIsEditModalOpen(false);
        } catch (err: any) {
            const errorMessage =
                err.response?.data?.message ||
                err.message ||
                "Failed to update destination or activities";
            setError(errorMessage);
            console.error("Error in handleEditDestination:", err);
        }
    };

    const handleDeleteDestination = async () => {
        if (!currentDestination) return;
        try {
            setError(null);
            await api.deleteDestination(currentDestination.id);
            setDestinationList(
                destinationList.filter(
                    (dest) => dest.id !== currentDestination.id
                )
            );
            setIsDeleteModalOpen(false);
        } catch (err: any) {
            const errorMessage =
                err.response?.data?.message ||
                err.message ||
                "Failed to delete destination";
            setError(errorMessage);
            console.error("Error in handleDeleteDestination:", err);
        }
    };

    if (!user || user.role !== "admin") {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg text-gray-600">
                    You do not have permission to access this page.
                </p>
            </div>
        );
    }

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-screen">
                    <p className="text-lg text-gray-600">Loading...</p>
                </div>
            </AdminLayout>
        );
    }

    if (error) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-screen">
                    <p className="text-lg text-red-600">{error}</p>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="px-4 py-6 sm:px-0">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Destinations Management
                    </h1>
                    <button
                        onClick={openAddModal}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Add Destination
                    </button>
                </div>
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Destination
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Region
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Created By
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Rating
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Activities
                                            </th>
                                            <th
                                                scope="col"
                                                className="relative px-6 py-3"
                                            >
                                                <span className="sr-only">
                                                    Edit
                                                </span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {destinationList.map((destination) => (
                                            <tr key={destination.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            <img
                                                                className="h-10 w-10 rounded-full object-cover"
                                                                src={
                                                                    destination.image ||
                                                                    "https://via.placeholder.com/40"
                                                                }
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {
                                                                    destination.name
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {destination.sort_by}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {destination.user?.name ||
                                                        "Unknown"}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                                                        <span className="text-sm text-gray-900">
                                                            {destination.reviews &&
                                                            destination.reviews
                                                                .length > 0
                                                                ? (
                                                                      destination.reviews.reduce(
                                                                          (
                                                                              sum,
                                                                              review
                                                                          ) =>
                                                                              sum +
                                                                              review.rating,
                                                                          0
                                                                      ) /
                                                                      destination
                                                                          .reviews
                                                                          .length
                                                                  ).toFixed(1)
                                                                : "0.0"}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    {destination.activities &&
                                                    destination.activities
                                                        .length > 0
                                                        ? destination.activities.map(
                                                              (act) => (
                                                                  <div
                                                                      key={
                                                                          act.id
                                                                      }
                                                                      className="flex items-center mb-2"
                                                                  >
                                                                      <span>
                                                                          {
                                                                              act.name
                                                                          }
                                                                      </span>
                                                                      {act.image && (
                                                                          <img
                                                                              src={
                                                                                  act.image
                                                                              }
                                                                              alt={
                                                                                  act.name
                                                                              }
                                                                              className="ml-2 h-6 w-6 object-cover rounded"
                                                                          />
                                                                      )}
                                                                  </div>
                                                              )
                                                          )
                                                        : "None"}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button
                                                        onClick={() =>
                                                            openEditModal(
                                                                destination
                                                            )
                                                        }
                                                        className="text-blue-600 hover:text-blue-900 mr-4"
                                                    >
                                                        <PencilIcon className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            openDeleteModal(
                                                                destination
                                                            )
                                                        }
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        <TrashIcon className="h-5 w-5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isAddModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    onClick={() => setIsAddModalOpen(false)}
                >
                    <div
                        ref={addModalRef}
                        className="relative bg-white rounded-xl p-8 shadow-2xl transform transition-all max-w-lg w-full mx-4 sm:mx-0 max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1 transition-colors"
                            onClick={() => setIsAddModalOpen(false)}
                            aria-label="Close modal"
                        >
                            <XIcon className="h-6 w-6" />
                        </button>
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">
                            Add New Destination
                        </h3>
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200">
                                {error}
                            </div>
                        )}
                        <form
                            onSubmit={handleAddDestination}
                            className="space-y-6"
                            encType="multipart/form-data"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-semibold text-gray-700 mb-2"
                                    >
                                        Destination Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-sm bg-gray-50 hover:bg-white placeholder-gray-400"
                                        placeholder="e.g., Paris"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="amount"
                                        className="block text-sm font-semibold text-gray-700 mb-2"
                                    >
                                        Amount
                                    </label>
                                    <input
                                        type="text"
                                        name="amount"
                                        id="amount"
                                        value={formData.amount}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-sm bg-gray-50 hover:bg-white placeholder-gray-400"
                                        placeholder="e.g., $500"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                >
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    id="description"
                                    rows={4}
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-sm bg-gray-50 hover:bg-white placeholder-gray-400 resize-none"
                                    placeholder="Describe the destination"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="image"
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                >
                                    Destination Image
                                </label>
                                <input
                                    type="file"
                                    name="image"
                                    id="image"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="w-full text-sm text-gray-600 file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 file:hover:bg-blue-100 file:shadow-sm file:transition-colors"
                                />
                            </div>
                            <div className="border-t border-gray-200 pt-6">
                                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                                    Activities
                                </h4>
                                {formData.activities.map((activity, index) => (
                                    <div
                                        key={index}
                                        className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm relative"
                                    >
                                        <h5 className="text-sm font-semibold text-gray-700 mb-2">
                                            Activity {index + 1}
                                        </h5>
                                        <div className="space-y-4">
                                            <div>
                                                <label
                                                    htmlFor={`activity-name-${index}`}
                                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                                >
                                                    Activity Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id={`activity-name-${index}`}
                                                    placeholder="e.g., Eiffel Tower Tour"
                                                    value={activity.name}
                                                    onChange={(e) =>
                                                        handleActivityChange(
                                                            e,
                                                            index,
                                                            "name"
                                                        )
                                                    }
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-sm bg-gray-50 hover:bg-white placeholder-gray-400"
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor={`activity-image-${index}`}
                                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                                >
                                                    Activity Image
                                                </label>
                                                <input
                                                    type="file"
                                                    name="image"
                                                    id={`activity-image-${index}`}
                                                    accept="image/*"
                                                    onChange={(e) =>
                                                        handleActivityChange(
                                                            e,
                                                            index,
                                                            "image"
                                                        )
                                                    }
                                                    className="w-full text-sm text-gray-600 file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 file:hover:bg-blue-100 file:shadow-sm file:transition-colors"
                                                />
                                            </div>
                                        </div>
                                        {index > 0 && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeActivity(index)
                                                }
                                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1 transition-colors"
                                                aria-label="Remove activity"
                                            >
                                                <XIcon className="h-5 w-5" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addActivity}
                                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-sm"
                                >
                                    <PlusIcon className="h-4 w-4 mr-2" />
                                    Add Another Activity
                                </button>
                            </div>
                            <div className="flex justify-end space-x-4 pt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-sm"
                                >
                                    Add Destination
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {isEditModalOpen && currentDestination && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                    onClick={() => setIsEditModalOpen(false)}
                >
                    <div
                        ref={editModalRef}
                        className="relative bg-white rounded-lg px-4 pt-5 pb-4 shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mt-3 sm:mt-0 sm:text-left">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Edit Destination
                            </h3>
                            <form
                                onSubmit={handleEditDestination}
                                className="mt-4 space-y-4"
                                encType="multipart/form-data"
                            >
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="sort_by"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Region
                                    </label>
                                    <input
                                        type="text"
                                        name="sort_by"
                                        id="sort_by"
                                        value={formData.sort_by}
                                        onChange={handleInputChange}
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="description"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        id="description"
                                        rows={3}
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="image"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Destination Image
                                    </label>
                                    <input
                                        type="file"
                                        name="image"
                                        id="image"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    {currentDestination.image && (
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-600">
                                                Current Image:
                                            </p>
                                            <img
                                                src={currentDestination.image}
                                                alt="Current destination"
                                                className="h-20 w-20 object-cover rounded"
                                            />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Activities
                                    </label>
                                    {formData.activities.map(
                                        (activity, index) => (
                                            <div
                                                key={index}
                                                className="mt-2 space-y-2"
                                            >
                                                <div className="flex items-center">
                                                    <input
                                                        type="text"
                                                        placeholder="Activity name"
                                                        value={activity.name}
                                                        onChange={(e) =>
                                                            handleActivityChange(
                                                                e,
                                                                index,
                                                                "name"
                                                            )
                                                        }
                                                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                    />
                                                    {index > 0 && (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                removeActivity(
                                                                    index
                                                                )
                                                            }
                                                            className="ml-2 inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                        >
                                                            <TrashIcon className="h-4 w-4" />
                                                        </button>
                                                    )}
                                                </div>
                                                <input
                                                    type="file"
                                                    name="image"
                                                    id={`activity-image-${index}`}
                                                    accept="image/*"
                                                    onChange={(e) =>
                                                        handleActivityChange(
                                                            e,
                                                            index,
                                                            "image"
                                                        )
                                                    }
                                                    className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                />
                                                {activity.id &&
                                                    currentDestination.activities.find(
                                                        (act) =>
                                                            act.id ===
                                                            activity.id
                                                    )?.image && (
                                                        <div className="mt-2">
                                                            <p className="text-sm text-gray-600">
                                                                Current Activity
                                                                Image:
                                                            </p>
                                                            <img
                                                                src={
                                                                    currentDestination.activities.find(
                                                                        (act) =>
                                                                            act.id ===
                                                                            activity.id
                                                                    )?.image
                                                                }
                                                                alt={
                                                                    activity.name
                                                                }
                                                                className="h-20 w-20 object-cover rounded"
                                                            />
                                                        </div>
                                                    )}
                                            </div>
                                        )
                                    )}
                                    <button
                                        type="button"
                                        onClick={addActivity}
                                        className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-blue-700 bg-blue-100 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Add Activity
                                    </button>
                                </div>
                                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setIsEditModalOpen(false)
                                        }
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:text-sm"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {isDeleteModalOpen && currentDestination && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                    onClick={() => setIsDeleteModalOpen(false)}
                >
                    <div
                        ref={deleteModalRef}
                        className="relative bg-white rounded-lg px-4 pt-5 pb-4 shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="sm:flex sm:items-start">
                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                <TrashIcon className="h-6 w-6 text-red-600" />
                            </div>
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    Delete Destination
                                </h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Are you sure you want to delete "
                                        {currentDestination.name}"? This action
                                        cannot be undone.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                            <button
                                type="button"
                                onClick={handleDeleteDestination}
                                className="w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                Delete
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default AdminDestinations;
