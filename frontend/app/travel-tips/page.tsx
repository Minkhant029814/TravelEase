"use client";
import React, { useState, memo } from "react";
import {
    BookOpenIcon,
    ClockIcon,
    TagIcon,
    SearchIcon,
    FilterIcon,
    PlusIcon,
    XIcon,
} from "lucide-react";
import Link from "next/link";

interface Tip {
    id: number;
    title: string;
    content: string;
    category: string;
    readTime: string;
    date: string;
    image: string;
}

const travelTipsData: Tip[] = [
    {
        id: 1,
        title: "Essential Packing Tips for Every Traveler",
        content:
            "Learn how to pack efficiently and never forget important items. Start by making a list of essentials based on your destination and trip duration. Roll clothes instead of folding to save space and prevent wrinkles. Use packing cubes to organize items by category. Always pack a basic first aid kit and keep important documents and valuables in your carry-on.",
        category: "Preparation",
        readTime: "5 min read",
        date: "June 15, 2023",
        image: "https://images.unsplash.com/photo-1581553680321-4fffae59fccd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    },
    {
        id: 2,
        title: "How to Find the Best Local Cuisine",
        content:
            "Discover authentic local food experiences wherever you travel. Research traditional dishes before you arrive. Ask hotel staff or local residents for recommendations instead of relying solely on tourist guides. Look for restaurants filled with locals rather than tourists. Consider taking a food tour early in your trip to get oriented. Visit local markets to sample fresh ingredients and street food.",
        category: "Food & Dining",
        readTime: "4 min read",
        date: "May 28, 2023",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    },
    {
        id: 3,
        title: "Budget Travel Strategies That Work",
        content:
            "Travel more while spending less with these proven strategies. Book flights 2-3 months in advance and use incognito mode when searching. Consider traveling during shoulder seasons for lower prices and fewer crowds. Use public transportation instead of taxis. Look into city passes that combine multiple attractions. Stay in accommodations with kitchen access to save on meal costs.",
        category: "Budget",
        readTime: "6 min read",
        date: "April 10, 2023",
        image: "https://images.unsplash.com/photo-1580458148391-8c4951dc1465?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    },
    {
        id: 4,
        title: "Staying Safe While Traveling Solo",
        content:
            "Essential safety tips for solo travelers around the world. Research your destination thoroughly before arrival. Share your itinerary with family or friends. Keep digital copies of important documents. Trust your instincts and be aware of common scams in the area. Consider joining group tours for certain activities. Stay in well-reviewed accommodations in safe neighborhoods.",
        category: "Safety",
        readTime: "7 min read",
        date: "March 5, 2023",
        image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1746&q=80",
    },
    {
        id: 5,
        title: "How to Beat Jet Lag Naturally",
        content:
            "Practical strategies to minimize jet lag and enjoy your trip from day one. Start adjusting your sleep schedule a few days before departure. Stay hydrated before, during, and after your flight. Avoid alcohol and caffeine on the plane. Get exposure to natural sunlight at your destination. Take short naps (20-30 minutes) if needed, but try to stay awake until the local bedtime.",
        category: "Health",
        readTime: "5 min read",
        date: "February 18, 2023",
        image: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    },
    {
        id: 6,
        title: "Photography Tips for Travelers",
        content:
            "Capture stunning travel memories with these photography techniques. Wake up early to catch the golden hour light and avoid crowds. Research photo spots before you arrive but also explore off the beaten path. Learn the basic rules of composition like the rule of thirds. Include people in some shots to add scale and storytelling. Back up your photos regularly while traveling.",
        category: "Photography",
        readTime: "8 min read",
        date: "January 25, 2023",
        image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1744&q=80",
    },
];

const categories = [...new Set(travelTipsData.map((tip) => tip.category))];

const TravelTips = () => {
    const [tips, setTips] = useState<Tip[]>(travelTipsData);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        category: "",
        readTime: "",
        date: "",
        image: null as File | null,
    });
    const [formError, setFormError] = useState<string | null>(null);

    const filteredTips = tips
        .filter(
            (tip) =>
                tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                tip.content.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(
            (tip) =>
                selectedCategory === "" || tip.category === selectedCategory
        );

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
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

    const handleAddBlog = (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);

        if (
            !formData.title.trim() ||
            !formData.content.trim() ||
            !formData.category.trim() ||
            !formData.readTime.trim() ||
            !formData.date.trim() ||
            !formData.image
        ) {
            setFormError("All fields are required.");
            return;
        }

        const newTip: Tip = {
            id: tips.length + 1, // Simple ID generation for demo
            title: formData.title,
            content: formData.content,
            category: formData.category,
            readTime: formData.readTime,
            date: formData.date,
            image: formData.image
                ? URL.createObjectURL(formData.image)
                : "https://via.placeholder.com/1740",
        };

        setTips([...tips, newTip]);
        setFormData({
            title: "",
            content: "",
            category: "",
            readTime: "",
            date: "",
            image: null,
        });
        setIsAddModalOpen(false);
        // Placeholder for API call
        // try {
        //   await api.createBlog(newTip);
        // } catch (err) {
        //   setFormError("Failed to add blog.");
        // }
    };

    const openAddModal = () => {
        setFormData({
            title: "",
            content: "",
            category: "",
            readTime: "",
            date: "",
            image: null,
        });
        setFormError(null);
        setIsAddModalOpen(true);
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="bg-blue-700 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-white">
                        Travel Tips & Advice
                    </h1>
                    <p className="mt-2 text-blue-100">
                        Expert guidance to help you travel smarter, safer, and
                        more enjoyably
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
                <div className="flex justify-center mb-8">
                    <button
                        onClick={openAddModal}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Add Blog
                    </button>
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
                                        <p className="ml-2 text-sm text-blue-600">
                                            {tip.category}
                                        </p>
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
            {isAddModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-70 "
                    onClick={() => setIsAddModalOpen(false)}
                >
                    <div
                        className="relative bg-white rounded-xl p-8 shadow-xl transform transition-all max-w-lg w-full mx-4 sm:mx-0 max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1 transition-colors"
                            onClick={() => setIsAddModalOpen(false)}
                        >
                            <XIcon className="h-6 w-6" />
                            <span className="sr-only">Close modal</span>
                        </button>
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">
                            Add New Blog
                        </h3>
                        {formError && (
                            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200">
                                {formError}
                            </div>
                        )}
                        <form onSubmit={handleAddBlog} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="title"
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                >
                                    Blog Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm bg-gray-50 hover:bg-white placeholder-gray-400"
                                    placeholder="e.g., Top 10 Travel Hacks"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="content"
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                >
                                    Content
                                </label>
                                <textarea
                                    name="content"
                                    id="content"
                                    rows={5}
                                    value={formData.content}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm bg-gray-50 hover:bg-white placeholder-gray-400 resize-none"
                                    placeholder="Write your blog content here..."
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="category"
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                >
                                    Category
                                </label>
                                <select
                                    name="category"
                                    id="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm bg-gray-50 hover:bg-white placeholder-gray-400"
                                >
                                    <option value="" disabled>
                                        Select a category
                                    </option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label
                                    htmlFor="readTime"
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                >
                                    Read Time
                                </label>
                                <input
                                    type="text"
                                    name="readTime"
                                    id="readTime"
                                    value={formData.readTime}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm bg-gray-50 hover:bg-white placeholder-gray-400"
                                    placeholder="e.g., 5 min read"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="date"
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                >
                                    Date
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    id="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm bg-gray-50 hover:bg-white"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="image"
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                >
                                    Blog Image
                                </label>
                                <input
                                    type="file"
                                    name="image"
                                    id="image"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    required
                                    className="w-full text-sm text-gray-600 file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 file:hover:bg-blue-100 file:cursor-pointer file:transition-colors"
                                />
                                {formData.image && (
                                    <p className="mt-2 text-sm text-gray-500 truncate">
                                        Selected: {formData.image.name}
                                    </p>
                                )}
                            </div>
                            <div className="flex justify-end space-x-4 pt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-sm flex items-center"
                                >
                                    <PlusIcon className="h-4 w-4 mr-2" />
                                    Add Blog
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default memo(TravelTips);
