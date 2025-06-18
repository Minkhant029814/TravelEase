"use client";
import React, { useState } from "react";
import {
  UserIcon,
  BellIcon,
  LockIcon,
  GlobeIcon,
  CreditCardIcon,
  ShieldIcon,
} from "lucide-react";
const UserSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const tabs = [
    {
      id: "profile",
      name: "Profile",
      icon: UserIcon,
    },
    {
      id: "notifications",
      name: "Notifications",
      icon: BellIcon,
    },
    {
      id: "security",
      name: "Security",
      icon: LockIcon,
    },
    {
      id: "preferences",
      name: "Preferences",
      icon: GlobeIcon,
    },
    {
      id: "payment",
      name: "Payment Methods",
      icon: CreditCardIcon,
    },
    {
      id: "privacy",
      name: "Privacy",
      icon: ShieldIcon,
    },
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage your account settings and preferences
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-6">
          {/* Sidebar */}
          <div className="sm:col-span-1">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === tab.id
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon
                      className={`mr-3 h-5 w-5 ${
                        activeTab === tab.id ? "text-blue-500" : "text-gray-400"
                      }`}
                    />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>
          {/* Content */}
          <div className="sm:col-span-5">
            <div className="bg-white shadow rounded-lg">
              {activeTab === "profile" && (
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-6">
                    Profile Information
                  </h2>
                  <form className="space-y-6">
                    <div className="flex items-center">
                      <div className="relative">
                        <img
                          className="h-24 w-24 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt="Profile"
                        />
                        <button
                          type="button"
                          className="absolute bottom-0 right-0 bg-white rounded-full p-1 border border-gray-300"
                        >
                          <span className="sr-only">Change avatar</span>
                          <UserIcon className="h-4 w-4 text-gray-400" />
                        </button>
                      </div>
                      <button
                        type="button"
                        className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Change
                      </button>
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          First name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          id="firstName"
                          defaultValue="John"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="lastName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Last name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          id="lastName"
                          defaultValue="Doe"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                      <div className="sm:col-span-2">
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
                          defaultValue="john.doe@example.com"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Phone number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          defaultValue="+1 (555) 123-4567"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Save changes
                      </button>
                    </div>
                  </form>
                </div>
              )}
              {activeTab === "notifications" && (
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-6">
                    Notification Preferences
                  </h2>
                  <div className="space-y-6">
                    {[
                      {
                        title: "Travel Updates",
                        description:
                          "Get notified about your upcoming trips and itinerary changes",
                      },
                      {
                        title: "Promotional Emails",
                        description: "Receive special offers and travel deals",
                      },
                      {
                        title: "Account Security",
                        description:
                          "Get alerts about suspicious activity and security updates",
                      },
                    ].map((item) => (
                      <div key={item.title} className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id={item.title}
                            name={item.title}
                            type="checkbox"
                            defaultChecked
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3">
                          <label
                            htmlFor={item.title}
                            className="font-medium text-gray-700"
                          >
                            {item.title}
                          </label>
                          <p className="text-sm text-gray-500">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === "security" && (
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-6">
                    Security Settings
                  </h2>
                  <form className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        Change Password
                      </h3>
                      <div className="mt-4 space-y-4">
                        <div>
                          <label
                            htmlFor="current-password"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Current Password
                          </label>
                          <input
                            type="password"
                            name="current-password"
                            id="current-password"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="new-password"
                            className="block text-sm font-medium text-gray-700"
                          >
                            New Password
                          </label>
                          <input
                            type="password"
                            name="new-password"
                            id="new-password"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="confirm-password"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            name="confirm-password"
                            id="confirm-password"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        Two-Factor Authentication
                      </h3>
                      <div className="mt-4">
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          Enable Two-Factor Authentication
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Save changes
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserSettings;
