"use client";
import React, { useState } from "react";
import { PlusIcon, PencilIcon, TrashIcon, StarIcon } from "lucide-react";
import { destinations } from "../mockData";
import AdminLayout from "../Layout";

const AdminDestinations = () => {
    const [destinationList, setDestinationList] = useState(destinations);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentDestination, setCurrentDestination] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        location: "",
        description: "",
        image: "",
        price: 0,
        rating: 0,
        duration: "",
        featured: false,
        activities: [""],
        inclusions: [""],
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleArrayInput = (e, index, field) => {
        const newArray = [...formData[field]];
        newArray[index] = e.target.value;
        setFormData({
            ...formData,
            [field]: newArray,
        });
    };

    const addArrayItem = (field) => {
        setFormData({
            ...formData,
            [field]: [...formData[field], ""],
        });
    };

    const removeArrayItem = (index, field) => {
        const newArray = [...formData[field]];
        newArray.splice(index, 1);
        setFormData({
            ...formData,
            [field]: newArray,
        });
    };

    const openAddModal = () => {
        setFormData({
            title: "",
            location: "",
            description: "",
            image: "",
            price: 0,
            rating: 0,
            duration: "",
            featured: false,
            activities: [""],
            inclusions: [""],
        });
        setIsAddModalOpen(true);
    };

    const openEditModal = (destination) => {
        setCurrentDestination(destination);
        setFormData({
            title: destination.title,
            location: destination.location,
            description: destination.description,
            image: destination.image,
            price: destination.price,
            rating: destination.rating,
            duration: destination.duration,
            featured: destination.featured,
            activities: [...destination.activities],
            inclusions: [...destination.inclusions],
        });
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (destination) => {
        setCurrentDestination(destination);
        setIsDeleteModalOpen(true);
    };

    const handleAddDestination = (e) => {
        e.preventDefault();
        const newDestination = {
            id: `${destinationList.length + 1}`,
            ...formData,
        };
        setDestinationList([...destinationList, newDestination]);
        setIsAddModalOpen(false);
    };

    const handleEditDestination = (e) => {
        e.preventDefault();
        const updatedDestinations = destinationList.map((dest) =>
            dest.id === currentDestination.id
                ? {
                      ...dest,
                      ...formData,
                  }
                : dest
        );
        setDestinationList(updatedDestinations);
        setIsEditModalOpen(false);
    };

    const handleDeleteDestination = () => {
        const updatedDestinations = destinationList.filter(
            (dest) => dest.id !== currentDestination.id
        );
        setDestinationList(updatedDestinations);
        setIsDeleteModalOpen(false);
    };

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
                                                Location
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Price
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
                                                Duration
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Featured
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
                                                                    destination.image
                                                                }
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {
                                                                    destination.title
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {destination.location}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    ${destination.price}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                                                        <span className="text-sm text-gray-900">
                                                            {destination.rating.toFixed(
                                                                1
                                                            )}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {destination.duration}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span
                                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                            destination.featured
                                                                ? "bg-green-100 text-green-800"
                                                                : "bg-gray-100 text-gray-800"
                                                        }`}
                                                    >
                                                        {destination.featured
                                                            ? "Yes"
                                                            : "No"}
                                                    </span>
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
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div
                            className="fixed inset-0 transition-opacity"
                            aria-hidden="true"
                        >
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                        >
                            ​
                        </span>
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div>
                                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                    <h3
                                        className="text-lg leading-6 font-medium text-gray-900"
                                        id="modal-headline"
                                    >
                                        Add New Destination
                                    </h3>
                                    <form
                                        onSubmit={handleAddDestination}
                                        className="mt-4 space-y-4"
                                    >
                                        <div>
                                            <label
                                                htmlFor="title"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Title
                                            </label>
                                            <input
                                                type="text"
                                                name="title"
                                                id="title"
                                                value={formData.title}
                                                onChange={handleInputChange}
                                                required
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="location"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Location
                                            </label>
                                            <input
                                                type="text"
                                                name="location"
                                                id="location"
                                                value={formData.location}
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
                                                required
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label
                                                    htmlFor="price"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Price
                                                </label>
                                                <input
                                                    type="number"
                                                    name="price"
                                                    id="price"
                                                    min="0"
                                                    step="0.01"
                                                    value={formData.price}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="rating"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Rating
                                                </label>
                                                <input
                                                    type="number"
                                                    name="rating"
                                                    id="rating"
                                                    min="0"
                                                    max="5"
                                                    step="0.1"
                                                    value={formData.rating}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label
                                                    htmlFor="duration"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Duration
                                                </label>
                                                <input
                                                    type="text"
                                                    name="duration"
                                                    id="duration"
                                                    placeholder="e.g. 7 days"
                                                    value={formData.duration}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                />
                                            </div>
                                            <div className="flex items-center h-full mt-6">
                                                <input
                                                    type="checkbox"
                                                    name="featured"
                                                    id="featured"
                                                    checked={formData.featured}
                                                    onChange={handleInputChange}
                                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                />
                                                <label
                                                    htmlFor="featured"
                                                    className="ml-2 block text-sm text-gray-900"
                                                >
                                                    Featured Destination
                                                </label>
                                            </div>
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
                                                            value={activity}
                                                            onChange={(e) =>
                                                                handleArrayInput(
                                                                    e,
                                                                    index,
                                                                    "activities"
                                                                )
                                                            }
                                                            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                        />
                                                        {index > 0 && (
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    removeArrayItem(
                                                                        index,
                                                                        "activities"
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
                                                onClick={() =>
                                                    addArrayItem("activities")
                                                }
                                                className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            >
                                                Add Activity
                                            </button>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Inclusions
                                            </label>
                                            {formData.inclusions.map(
                                                (inclusion, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex mt-1"
                                                    >
                                                        <input
                                                            type="text"
                                                            value={inclusion}
                                                            onChange={(e) =>
                                                                handleArrayInput(
                                                                    e,
                                                                    index,
                                                                    "inclusions"
                                                                )
                                                            }
                                                            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                        />
                                                        {index > 0 && (
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    removeArrayItem(
                                                                        index,
                                                                        "inclusions"
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
                                                onClick={() =>
                                                    addArrayItem("inclusions")
                                                }
                                                className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            >
                                                Add Inclusion
                                            </button>
                                        </div>
                                        <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setIsAddModalOpen(false)
                                                }
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
                    </div>
                </div>
            )}
            {isEditModalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div
                            className="fixed inset-0 transition-opacity"
                            aria-hidden="true"
                        >
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                        >
                            ​
                        </span>
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div>
                                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                    <h3
                                        className="text-lg leading-6 font-medium text-gray-900"
                                        id="modal-headline"
                                    >
                                        Edit Destination
                                    </h3>
                                    <form
                                        onSubmit={handleEditDestination}
                                        className="mt-4 space-y-4"
                                    >
                                        <div>
                                            <label
                                                htmlFor="edit-title"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Title
                                            </label>
                                            <input
                                                type="text"
                                                name="title"
                                                id="edit-title"
                                                value={formData.title}
                                                onChange={handleInputChange}
                                                required
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="edit-location"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Location
                                            </label>
                                            <input
                                                type="text"
                                                name="location"
                                                id="edit-location"
                                                value={formData.location}
                                                onChange={handleInputChange}
                                                required
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="edit-description"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Description
                                            </label>
                                            <textarea
                                                name="description"
                                                id="edit-description"
                                                rows={3}
                                                value={formData.description}
                                                onChange={handleInputChange}
                                                required
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="edit-image"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Image URL
                                            </label>
                                            <input
                                                type="url"
                                                name="image"
                                                id="edit-image"
                                                value={formData.image}
                                                onChange={handleInputChange}
                                                required
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label
                                                    htmlFor="edit-price"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Price
                                                </label>
                                                <input
                                                    type="number"
                                                    name="price"
                                                    id="edit-price"
                                                    min="0"
                                                    step="0.01"
                                                    value={formData.price}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="edit-rating"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Rating
                                                </label>
                                                <input
                                                    type="number"
                                                    name="rating"
                                                    id="edit-rating"
                                                    min="0"
                                                    max="5"
                                                    step="0.1"
                                                    value={formData.rating}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label
                                                    htmlFor="edit-duration"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Duration
                                                </label>
                                                <input
                                                    type="text"
                                                    name="duration"
                                                    id="edit-duration"
                                                    placeholder="e.g. 7 days"
                                                    value={formData.duration}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                />
                                            </div>
                                            <div className="flex items-center h-full mt-6">
                                                <input
                                                    type="checkbox"
                                                    name="featured"
                                                    id="edit-featured"
                                                    checked={formData.featured}
                                                    onChange={handleInputChange}
                                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                />
                                                <label
                                                    htmlFor="edit-featured"
                                                    className="ml-2 block text-sm text-gray-900"
                                                >
                                                    Featured Destination
                                                </label>
                                            </div>
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
                                                            value={activity}
                                                            onChange={(e) =>
                                                                handleArrayInput(
                                                                    e,
                                                                    index,
                                                                    "activities"
                                                                )
                                                            }
                                                            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                        />
                                                        {index > 0 && (
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    removeArrayItem(
                                                                        index,
                                                                        "activities"
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
                                                onClick={() =>
                                                    addArrayItem("activities")
                                                }
                                                className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            >
                                                Add Activity
                                            </button>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Inclusions
                                            </label>
                                            {formData.inclusions.map(
                                                (inclusion, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex mt-1"
                                                    >
                                                        <input
                                                            type="text"
                                                            value={inclusion}
                                                            onChange={(e) =>
                                                                handleArrayInput(
                                                                    e,
                                                                    index,
                                                                    "inclusions"
                                                                )
                                                            }
                                                            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                        />
                                                        {index > 0 && (
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    removeArrayItem(
                                                                        index,
                                                                        "inclusions"
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
                                                onClick={() =>
                                                    addArrayItem("inclusions")
                                                }
                                                className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            >
                                                Add Inclusion
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
                    </div>
                </div>
            )}
            {isDeleteModalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div
                            className="fixed inset-0 transition-opacity"
                            aria-hidden="true"
                        >
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                        >
                            ​
                        </span>
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <TrashIcon className="h-6 w-6 text-red-600" />
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3
                                        className="text-lg leading-6 font-medium text-gray-900"
                                        id="modal-headline"
                                    >
                                        Delete Destination
                                    </h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Are you sure you want to delete "
                                            {currentDestination?.title}"? This
                                            action cannot be undone.
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
                </div>
            )}
        </AdminLayout>
    );
};

export default AdminDestinations;
