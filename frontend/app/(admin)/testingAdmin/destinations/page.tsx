"use client";
import React, { useState, useEffect, useRef } from "react";
import { PlusIcon, PencilIcon, TrashIcon, StarIcon } from "lucide-react";
import AdminLayout from "../Layout";
import api from "@/lib/api";
import { AppHook } from "@/context/AppProvider";

interface Activity {
    id: number;
    name: string;
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
        image: "",
        user_id: 0,
        activities: [{ name: "" }],
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
            addModalRef.current.focus();
        }
        if (isEditModalOpen && editModalRef.current) {
            editModalRef.current.focus();
        }
        if (isDeleteModalOpen && deleteModalRef.current) {
            deleteModalRef.current.focus();
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

    const handleActivityChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const newActivities = [...formData.activities];
        newActivities[index].name = e.target.value;
        setFormData({
            ...formData,
            activities: newActivities,
        });
    };

    const addActivity = () => {
        setFormData({
            ...formData,
            activities: [...formData.activities, { name: "" }],
        });
    };

    const removeActivity = (index: number) => {
        const newActivities = formData.activities.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            activities:
                newActivities.length > 0 ? newActivities : [{ name: "" }],
        });
    };

    const openAddModal = () => {
        setFormData({
            name: "",
            sort_by: "",
            description: "",
            image: "",
            user_id: user?.id || 0,
            activities: [{ name: "" }],
        });
        setIsAddModalOpen(true);
    };

    const openEditModal = (destination: Destination) => {
        setCurrentDestination(destination);
        setFormData({
            name: destination.name,
            sort_by: destination.sort_by,
            description: destination.description,
            image: destination.image || "",
            user_id: destination.user_id,
            activities:
                destination.activities.length > 0
                    ? destination.activities.map((act) => ({ name: act.name }))
                    : [{ name: "" }],
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
            console.log(formData);
            const response = await api.createDestination({
                ...formData,
                activities: formData.activities.filter(
                    (act) => act.name.trim() !== ""
                ),
            });
            setDestinationList([...destinationList, response.data]);
            setIsAddModalOpen(false);
        } catch (err) {
            setError("Failed to add destination");
            console.error(err);
        }
    };

    const handleEditDestination = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentDestination) return;
        try {
            const response = await api.updateDestination(
                currentDestination.id,
                {
                    ...formData,
                    activities: formData.activities.filter(
                        (act) => act.name.trim() !== ""
                    ),
                }
            );
            const updatedDestinations = destinationList.map((dest) =>
                dest.id === currentDestination.id ? response.data : dest
            );
            setDestinationList(updatedDestinations);
            setIsEditModalOpen(false);
        } catch (err) {
            setError("Failed to update destination");
            console.error(err);
        }
    };

    const handleDeleteDestination = async () => {
        if (!currentDestination) return;
        try {
            await api.deleteDestination(currentDestination.id);
            setDestinationList(
                destinationList.filter(
                    (dest) => dest.id !== currentDestination.id
                )
            );
            setIsDeleteModalOpen(false);
        } catch (err) {
            setError("Failed to delete destination");
            console.error(err);
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
                    <p className="text-lg text-gray-600">{error}</p>
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
                                                                : "N/A"}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {destination.activities &&
                                                    destination.activities
                                                        .length > 0
                                                        ? destination.activities
                                                              .map(
                                                                  (act) =>
                                                                      act.name
                                                              )
                                                              .join(", ")
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
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                    onClick={() => setIsAddModalOpen(false)}
                >
                    <div
                        ref={addModalRef}
                        className="relative bg-white rounded-lg px-4 pt-5 pb-4 shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6"
                        onClick={(e) => e.stopPropagation()}
                        tabIndex={-1}
                    >
                        <div className="mt-3 sm:mt-0 sm:text-left">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Add New Destination
                            </h3>
                            <form
                                onSubmit={handleAddDestination}
                                className="mt-4 space-y-4"
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
                                        autoFocus
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
                                        Image URL
                                    </label>
                                    <input
                                        type="url"
                                        name="image"
                                        id="image"
                                        value={formData.image}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Activities
                                    </label>
                                    {formData.activities.map(
                                        (activity, index) => (
                                            <div
                                                key={index}
                                                className="flex mt-1"
                                            >
                                                <input
                                                    type="text"
                                                    value={activity.name}
                                                    onChange={(e) =>
                                                        handleActivityChange(
                                                            e,
                                                            index
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
                                                        className="ml-2 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                    >
                                                        <TrashIcon className="h-4 w-4" />
                                                    </button>
                                                )}
                                            </div>
                                        )
                                    )}
                                    <button
                                        type="button"
                                        onClick={addActivity}
                                        className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Add Activity
                                    </button>
                                </div>
                                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsAddModalOpen(false)}
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:text-sm"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                                    >
                                        Add Destination
                                    </button>
                                </div>
                            </form>
                        </div>
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
                        tabIndex={-1}
                    >
                        <div className="mt-3 sm:mt-0 sm:text-left">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Edit Destination
                            </h3>
                            <form
                                onSubmit={handleEditDestination}
                                className="mt-4 space-y-4"
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
                                        autoFocus
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
                                        Image URL
                                    </label>
                                    <input
                                        type="url"
                                        name="image"
                                        id="image"
                                        value={formData.image}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Activities
                                    </label>
                                    {formData.activities.map(
                                        (activity, index) => (
                                            <div
                                                key={index}
                                                className="flex mt-1"
                                            >
                                                <input
                                                    type="text"
                                                    value={activity.name}
                                                    onChange={(e) =>
                                                        handleActivityChange(
                                                            e,
                                                            index
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
                                                        className="ml-2 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                    >
                                                        <TrashIcon className="h-4 w-4" />
                                                    </button>
                                                )}
                                            </div>
                                        )
                                    )}
                                    <button
                                        type="button"
                                        onClick={addActivity}
                                        className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
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
                        tabIndex={-1}
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
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
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
