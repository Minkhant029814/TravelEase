"use client";
import React, { useState, useEffect, useRef } from "react";
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon } from "lucide-react";
import AdminLayout from "../Layout";
import api from "@/lib/api";
import { AppHook } from "@/context/AppProvider";

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
}

interface Reservation {
    id: number;
    user_id: number;
    destination_id: number;
    travel_details: string;
    amount: string;
    status: string;
    created_at: string;
    confirmation_code: string;
}

const AdminUsers = () => {
    const [usersList, setUsersList] = useState<User[]>([]);
    const [reservationsList, setReservationsList] = useState<Reservation[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "user",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = AppHook();
    const addModalRef = useRef<HTMLDivElement>(null);
    const editModalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [usersResponse, reservationsResponse] = await Promise.all(
                    [api.getUsers(), api.getReservations()]
                );
                setUsersList(usersResponse.data);
                setReservationsList(reservationsResponse.data);
            } catch (err) {
                setError("Failed to fetch data");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (isAddModalOpen && addModalRef.current) {
            addModalRef.current.focus();
        }
        if (isEditModalOpen && editModalRef.current) {
            editModalRef.current.focus();
        }
    }, [isAddModalOpen, isEditModalOpen]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const openAddModal = () => {
        setFormData({
            name: "",
            email: "",
            password: "",
            role: "user",
        });
        setIsAddModalOpen(true);
    };

    const openEditModal = (user: User) => {
        setCurrentUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            password: "",
            role: user.role,
        });
        setIsEditModalOpen(true);
    };

    const openViewModal = (user: User) => {
        setCurrentUser(user);
        setIsViewModalOpen(true);
    };

    const openDeleteModal = (user: User) => {
        setCurrentUser(user);
        setIsDeleteModalOpen(true);
    };

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.createUser({
                ...formData,
                created_at: new Date().toISOString(),
            });
            setUsersList([...usersList, response.data]);
            setIsAddModalOpen(false);
        } catch (err) {
            setError("Failed to add user");
            console.error(err);
        }
    };

    const handleEditUser = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentUser) return;
        try {
            const response = await api.updateUser(currentUser.id, formData);
            setUsersList(
                usersList.map((u) =>
                    u.id === currentUser.id ? response.data : u
                )
            );
            setIsEditModalOpen(false);
        } catch (err) {
            setError("Failed to update user");
            console.error(err);
        }
    };

    const handleDelete = async () => {
        if (!currentUser) return;
        try {
            await api.deleteUser(currentUser.id);
            setUsersList(usersList.filter((u) => u.id !== currentUser.id));
            setIsDeleteModalOpen(false);
        } catch (err) {
            setError("Failed to delete user");
            console.error(err);
        }
    };

    const getUserReservations = (userId: number): Reservation[] => {
        return reservationsList.filter(
            (reservation) => reservation.user_id === userId
        );
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
                        Users Management
                    </h1>
                    <button
                        onClick={openAddModal}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Add User
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
                                                User
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Email
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Role
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Joined
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Reservations
                                            </th>
                                            <th
                                                scope="col"
                                                className="relative px-6 py-3"
                                            >
                                                <span className="sr-only">
                                                    Actions
                                                </span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {usersList.map((user) => (
                                            <tr key={user.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                                <span className="text-lg font-medium text-gray-600">
                                                                    {user.name.charAt(
                                                                        0
                                                                    )}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {user.name}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {user.email}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span
                                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                            user.role ===
                                                            "admin"
                                                                ? "bg-purple-100 text-purple-800"
                                                                : "bg-green-100 text-green-800"
                                                        }`}
                                                    >
                                                        {user.role
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                            user.role.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(
                                                        user.created_at
                                                    ).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {
                                                        getUserReservations(
                                                            user.id
                                                        ).length
                                                    }
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button
                                                        onClick={() =>
                                                            openViewModal(user)
                                                        }
                                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                                    >
                                                        <EyeIcon className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            openEditModal(user)
                                                        }
                                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                                    >
                                                        <PencilIcon className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            openDeleteModal(
                                                                user
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
                                Add New User
                            </h3>
                            <form
                                onSubmit={handleAddUser}
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
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="role"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Role
                                    </label>
                                    <select
                                        name="role"
                                        id="role"
                                        value={formData.role}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
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
                                        Add User
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {isEditModalOpen && (
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
                                Edit User
                            </h3>
                            <form
                                onSubmit={handleEditUser}
                                className="mt-4 space-y-4"
                            >
                                <div>
                                    <label
                                        htmlFor="edit-name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="edit-name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        autoFocus
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="edit-email"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="edit-email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="edit-role"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Role
                                    </label>
                                    <select
                                        name="role"
                                        id="edit-role"
                                        value={formData.role}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
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
            {isViewModalOpen && currentUser && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                    onClick={() => setIsViewModalOpen(false)}
                >
                    <div
                        className="relative bg-white rounded-lg px-4 pt-5 pb-4 shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mt-3 sm:mt-0 sm:text-left">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                User Details
                            </h3>
                            <div className="mt-4">
                                <dl className="grid grid-cols-2 gap-x-4 gap-y-6">
                                    <div className="col-span-2">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Name
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            {currentUser.name}
                                        </dd>
                                    </div>
                                    <div className="col-span-2">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Email
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            {currentUser.email}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">
                                            Role
                                        </dt>
                                        <dd className="mt-1">
                                            <span
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    currentUser.role === "admin"
                                                        ? "bg-purple-100 text-purple-800"
                                                        : "bg-green-100 text-green-800"
                                                }`}
                                            >
                                                {currentUser.role
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    currentUser.role.slice(1)}
                                            </span>
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">
                                            Member Since
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            {new Date(
                                                currentUser.created_at
                                            ).toLocaleDateString()}
                                        </dd>
                                    </div>
                                    <div className="col-span-2">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Reservations
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            {
                                                getUserReservations(
                                                    currentUser.id
                                                ).length
                                            }{" "}
                                            reservations
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                        <div className="mt-5 sm:mt-6">
                            <button
                                type="button"
                                onClick={() => setIsViewModalOpen(false)}
                                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {isDeleteModalOpen && currentUser && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                    onClick={() => setIsDeleteModalOpen(false)}
                >
                    <div
                        className="relative bg-white rounded-lg px-4 pt-5 pb-4 shadow-sm sm:my-8 sm:max-w-lg sm:w-full sm:p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="sm:flex sm:items-start">
                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-gray-200 sm:mx-0 sm:h-10 sm:w-10">
                                <TrashIcon className="h-6 w-6 text-gray-600" />
                            </div>
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    Delete User
                                </h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Are you certain you want to delete user
                                        "{currentUser.name}"? This action is
                                        irreversible.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-blue-500 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
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

export default AdminUsers;
