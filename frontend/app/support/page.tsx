"use client";
import React, { useState } from "react";
import {
  MessageSquareIcon,
  PhoneIcon,
  MailIcon,
  InfoIcon,
  SendIcon,
} from "lucide-react";
const faqItems = [
  {
    question: "How can I change my reservation?",
    answer:
      "You can modify your reservation up to 48 hours before your scheduled trip. Simply go to 'My Reservations', select the booking you want to change, and click the 'Modify' button. Follow the instructions to make your changes.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Our cancellation policy varies depending on the destination and type of booking. In general, full refunds are available for cancellations made 7 days prior to your trip. Cancellations made between 7 days and 48 hours before your trip are eligible for a 50% refund. Cancellations made less than 48 hours before your trip are not refundable.",
  },
  {
    question: "How do I get my booking confirmation?",
    answer:
      "Your booking confirmation will be sent to the email address you provided during the booking process. You can also view and download your confirmation from the 'My Reservations' section of your account.",
  },
  {
    question: "Can I add additional travelers to my booking?",
    answer:
      "Yes, you can add additional travelers to your booking if space is available. Go to 'My Reservations', select the booking you want to modify, and follow the instructions to add travelers. Additional fees may apply.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept major credit cards (Visa, MasterCard, American Express), PayPal, and in some regions, bank transfers. All payments are processed securely through our payment gateway.",
  },
];
const CustomerSupport = () => {
  const [supportType, setSupportType] = useState("general");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reservationCode, setReservationCode] = useState("");
  const [message, setMessage] = useState("");
  const [expandedFaq, setExpandedFaq] = useState(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, this would submit the support request to your backend
    console.log("Support request submitted:", {
      supportType,
      name,
      email,
      reservationCode,
      message,
    });
    // Show success message, clear form, etc.
  };
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-blue-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-white">Customer Support</h1>
          <p className="mt-2 text-blue-100">
            We're here to help you with any questions or issues
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Support form */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">
                  Contact Support
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </p>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="support-type"
                      className="block text-sm font-medium text-gray-700"
                    >
                      What can we help you with?
                    </label>
                    <select
                      id="support-type"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      value={supportType}
                      onChange={(e) => setSupportType(e.target.value)}
                    >
                      <option value="general">General Inquiry</option>
                      <option value="reservation">Reservation Change</option>
                      <option value="payment">Payment Issue</option>
                      <option value="cancellation">Cancellation Request</option>
                      <option value="complaint">Complaint</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  {(supportType === "reservation" ||
                    supportType === "cancellation" ||
                    supportType === "payment") && (
                    <div>
                      <label
                        htmlFor="reservation-code"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Reservation Confirmation Code
                      </label>
                      <input
                        type="text"
                        id="reservation-code"
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        placeholder="e.g. CONF123456"
                        value={reservationCode}
                        onChange={(e) => setReservationCode(e.target.value)}
                        required
                      />
                    </div>
                  )}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="Please describe your issue or question in detail..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      id="privacy-policy"
                      name="privacy-policy"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      required
                    />
                    <label
                      htmlFor="privacy-policy"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      I agree to the privacy policy and consent to being
                      contacted via email.
                    </label>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <SendIcon className="h-4 w-4 mr-2" />
                      Submit Request
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* Sidebar */}
          <div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
              <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  Contact Information
                </h3>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <PhoneIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-3 text-sm">
                      <p className="font-medium text-gray-900">Phone Support</p>
                      <p className="text-gray-500">+1 (555) 123-4567</p>
                      <p className="text-gray-500 mt-1">
                        Monday - Friday: 9AM - 8PM EST
                      </p>
                      <p className="text-gray-500">
                        Saturday - Sunday: 10AM - 6PM EST
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <MailIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-3 text-sm">
                      <p className="font-medium text-gray-900">Email Support</p>
                      <p className="text-gray-500">
                        support@travelease.example.com
                      </p>
                      <p className="text-gray-500 mt-1">
                        We typically respond within 24 hours
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <MessageSquareIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-3 text-sm">
                      <p className="font-medium text-gray-900">Live Chat</p>
                      <p className="text-gray-500">
                        Available 24/7 through our mobile app
                      </p>
                      <button className="mt-2 inline-flex items-center px-3 py-1 border border-blue-300 text-sm font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50">
                        Download App
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  Frequently Asked Questions
                </h3>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <dl className="space-y-4">
                  {faqItems.map((item, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0"
                    >
                      <dt className="text-sm font-medium text-gray-900">
                        <button
                          className="flex justify-between items-center w-full text-left focus:outline-none"
                          onClick={() =>
                            setExpandedFaq(expandedFaq === index ? null : index)
                          }
                        >
                          <span>{item.question}</span>
                          <span className="ml-6 flex-shrink-0">
                            <InfoIcon
                              className={`h-5 w-5 text-blue-500 transform ${
                                expandedFaq === index ? "rotate-180" : ""
                              } transition-transform duration-200`}
                            />
                          </span>
                        </button>
                      </dt>
                      {expandedFaq === index && (
                        <dd className="mt-2 text-sm text-gray-500">
                          {item.answer}
                        </dd>
                      )}
                    </div>
                  ))}
                </dl>
                <div className="mt-6 text-center">
                  <a
                    href="#"
                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    View all FAQs →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CustomerSupport;
