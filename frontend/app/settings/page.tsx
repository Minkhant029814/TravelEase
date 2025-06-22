"use client";
import React, { useState } from "react";
import {
  UserIcon,
  BellIcon,
  LockIcon,
  GlobeIcon,
  CreditCardIcon,
  ShieldIcon,
  MailIcon,
  CalendarIcon,
} from "lucide-react";
import { AppHook } from "@/context/AppProvider";

const UserSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { user } = AppHook();

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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

                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Profile Picture Section */}
                    <div className="flex flex-col items-center">
                      <div className="relative">
                        <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                          {user?.profile_picture ? (
                            <img
                              src={user.profile_picture}
                              alt="Profile"
                              className="h-full w-full rounded-full object-cover"
                            />
                          ) : (
                            <UserIcon className="h-12 w-12 text-gray-400" />
                          )}
                        </div>
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
                        className="mt-4 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Change Photo
                      </button>
                    </div>

                    {/* User Info Section */}
                    <div className="flex-1">
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                          <div className="flex items-center mb-2">
                            <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                            <span className="text-sm font-medium text-gray-500">
                              Full Name
                            </span>
                          </div>
                          <div className="text-lg font-medium text-gray-900">
                            {user?.name || "Not provided"}
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <div className="flex items-center mb-2">
                            <MailIcon className="h-5 w-5 text-gray-400 mr-2" />
                            <span className="text-sm font-medium text-gray-500">
                              Email
                            </span>
                          </div>
                          <div className="text-lg font-medium text-gray-900">
                            {user?.email}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center mb-2">
                            <ShieldIcon className="h-5 w-5 text-gray-400 mr-2" />
                            <span className="text-sm font-medium text-gray-500">
                              Account Type
                            </span>
                          </div>
                          <div className="text-lg font-medium text-gray-900 capitalize">
                            {user?.role || "user"}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center mb-2">
                            <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                            <span className="text-sm font-medium text-gray-500">
                              Member Since
                            </span>
                          </div>
                          <div className="text-lg font-medium text-gray-900">
                            {user?.created_at
                              ? formatDate(user.created_at)
                              : "Unknown"}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <h3 className="text-md font-medium text-gray-900 mb-4">
                          Update Profile
                        </h3>
                        <form className="space-y-4">
                          <div>
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Full Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              defaultValue={user?.name || ""}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                          </div>
                          <div className="flex justify-end">
                            <button
                              type="submit"
                              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              Save Changes
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
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
                        enabled: true,
                      },
                      {
                        title: "Promotional Emails",
                        description: "Receive special offers and travel deals",
                        enabled: true,
                      },
                      {
                        title: "Account Security",
                        description:
                          "Get alerts about suspicious activity and security updates",
                        enabled: true,
                      },
                    ].map((item) => (
                      <div key={item.title} className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id={item.title}
                            name={item.title}
                            type="checkbox"
                            defaultChecked={item.enabled}
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
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-md font-medium text-gray-900 mb-2">
                        Email Verification
                      </h3>
                      <div className="flex items-center">
                        {user?.email_verified_at ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Verified
                          </span>
                        ) : (
                          <>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Not Verified
                            </span>
                            <button className="ml-3 text-sm font-medium text-blue-600 hover:text-blue-500">
                              Verify Email
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <h3 className="text-md font-medium text-gray-900 mb-4">
                        Change Password
                      </h3>
                      <form className="space-y-4">
                        <div>
                          <label
                            htmlFor="current-password"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Current Password
                          </label>
                          <input
                            type="password"
                            id="current-password"
                            name="current-password"
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
                            id="new-password"
                            name="new-password"
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
                            id="confirm-password"
                            name="confirm-password"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        </div>
                        <div className="flex justify-end">
                          <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Update Password
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
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
