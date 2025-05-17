"use client"

import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { BookingForm } from "@/components/booking-form"

export default function Home() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Rafiq Al Sahab
          </h1>
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex space-x-6">
              <a
                href="#features"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Pricing
              </a>
              <a
                href="#about"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Contact
              </a>
            </nav>
            <ThemeToggle />
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {showForm ? (
        <div className="py-8">
          <BookingForm />
        </div>
      ) : (
        <>
          {/* Hero Section */}
          <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-10 md:mb-0">
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                    Streamline Your Business Bookings
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                    Effortlessly manage appointments, reduce no-shows, and grow
                    your business with our powerful booking system.
                  </p>
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <button
                      onClick={() => setShowForm(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg font-medium"
                    >
                      Start Your Free Trial
                    </button>
                    <a
                      href="#features"
                      className="bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 px-6 py-3 rounded-md text-lg font-medium text-center"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <img
                    src="/placeholder.svg?height=400&width=500"
                    alt="Booking System Dashboard"
                    className="rounded-lg shadow-xl"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Powerful Features for Your Business
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Our booking system is designed to make your business
                  operations smoother and more efficient.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Feature 1 */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                  <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-blue-600 dark:text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    24/7 Online Booking
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Allow your customers to book appointments anytime, anywhere,
                    from any device.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                  <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-blue-600 dark:text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Automated Reminders
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Reduce no-shows with automated SMS and email reminders to
                    your clients.
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                  <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-blue-600 dark:text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Custom Booking Forms
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Collect all the information you need from clients during the
                    booking process.
                  </p>
                </div>

                {/* Feature 4 */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                  <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-blue-600 dark:text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Online Payments
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Accept payments online at the time of booking with our
                    secure payment integration.
                  </p>
                </div>

                {/* Feature 5 */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                  <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-blue-600 dark:text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Business Analytics
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Gain insights into your business with detailed reports and
                    analytics.
                  </p>
                </div>

                {/* Feature 6 */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                  <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-blue-600 dark:text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Mobile App
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Manage your bookings on the go with our dedicated mobile
                    application.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section id="pricing" className="py-20 bg-gray-50 dark:bg-gray-800">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Simple, Transparent Pricing
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Choose the plan that works best for your business needs.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {/* Basic Plan */}
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      Basic Plan
                    </h3>
                    <div className="mb-6">
                      <span className="text-5xl font-bold text-gray-900 dark:text-white">
                        169
                      </span>
                      <span className="text-xl text-gray-600 dark:text-gray-400">
                        {" "}
                        AED/month
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-8">
                      Perfect for small businesses just getting started with
                      online booking.
                    </p>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-center">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        <span className="text-gray-600 dark:text-gray-300">
                          Full online booking website
                        </span>
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        <span className="text-gray-600 dark:text-gray-300">
                          Mobile booking app
                        </span>
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        <span className="text-gray-600 dark:text-gray-300">
                          Up to 100 bookings/month
                        </span>
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        <span className="text-gray-600 dark:text-gray-300">
                          WhatsApp integration
                        </span>
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        <span className="text-gray-600 dark:text-gray-300">
                          100 WhatsApp Business credits
                        </span>
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        <span className="text-gray-600 dark:text-gray-300">
                          15% discount for annual subscription
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-8 bg-gray-50 dark:bg-gray-800">
                    <button
                      onClick={() => setShowForm(true)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md text-lg font-medium"
                    >
                      Get Started
                    </button>
                  </div>
                </div>

                {/* Premium Plan */}
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden border-2 border-blue-500 dark:border-blue-400 transform scale-105 z-10">
                  <div className="bg-blue-500 dark:bg-blue-600 text-white text-center py-2">
                    <span className="font-medium">Most Popular</span>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      Premium Plan
                    </h3>
                    <div className="mb-6">
                      <span className="text-5xl font-bold text-gray-900 dark:text-white">
                        399
                      </span>
                      <span className="text-xl text-gray-600 dark:text-gray-400">
                        {" "}
                        AED/month
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-8">
                      Ideal for growing businesses with higher booking volumes.
                    </p>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-center">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        <span className="text-gray-600 dark:text-gray-300">
                          All Basic Plan features
                        </span>
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        <span className="text-gray-600 dark:text-gray-300">
                          Up to 500 bookings/month
                        </span>
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        <span className="text-gray-600 dark:text-gray-300">
                          Direct online payment during booking
                        </span>
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        <span className="text-gray-600 dark:text-gray-300">
                          Advanced analytics dashboard
                        </span>
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        <span className="text-gray-600 dark:text-gray-300">
                          Priority customer support
                        </span>
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        <span className="text-gray-600 dark:text-gray-300">
                          Custom branding options
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-8 bg-gray-50 dark:bg-gray-800">
                    <button
                      onClick={() => setShowForm(true)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md text-lg font-medium"
                    >
                      Get Started
                    </button>
                  </div>
                </div>

                {/* Enterprise Plan */}
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      Enterprise Plan
                    </h3>
                    <div className="mb-6">
                      <span className="text-5xl font-bold text-gray-900 dark:text-white">
                        Custom
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-8">
                      Tailored solutions for large businesses with specific
                      requirements.
                    </p>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-center">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        <span className="text-gray-600 dark:text-gray-300">
                          All Premium Plan features
                        </span>
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        <span className="text-gray-600 dark:text-gray-300">
                          Unlimited bookings
                        </span>
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        <span className="text-gray-600 dark:text-gray-300">
                          Dedicated account manager
                        </span>
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        <span className="text-gray-600 dark:text-gray-300">
                          Custom integrations
                        </span>
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        <span className="text-gray-600 dark:text-gray-300">
                          API access
                        </span>
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        <span className="text-gray-600 dark:text-gray-300">
                          SLA with 99.9% uptime guarantee
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-8 bg-gray-50 dark:bg-gray-800">
                    <button
                      onClick={() => setShowForm(true)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md text-lg font-medium"
                    >
                      Contact Sales
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* About Us Section */}
          <section id="about" className="py-20">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-10 md:mb-0">
                  <img
                    src="/placeholder.svg?height=400&width=500"
                    alt="About Rafiq Al Sahab"
                    className="rounded-lg shadow-xl"
                  />
                </div>
                <div className="md:w-1/2 md:pl-12">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    About Rafiq Al Sahab
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    Rafiq Al Sahab Technology L.L.C is a UAE-registered entity
                    dedicated to providing innovative booking solutions for
                    businesses of all sizes.
                  </p>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    Our mission is to help businesses streamline their
                    appointment scheduling, reduce administrative overhead, and
                    provide a seamless booking experience for their customers.
                  </p>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    With years of experience in the industry, we understand the
                    unique challenges faced by service-based businesses and have
                    developed our platform to address these specific needs.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="py-20 bg-gray-50 dark:bg-gray-800">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Why Choose Us
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  We're committed to providing the best booking experience for
                  you and your customers.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Reason 1 */}
                <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Easy to Use
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our platform is designed to be intuitive and user-friendly,
                    requiring minimal training to get started.
                  </p>
                </div>

                {/* Reason 2 */}
                <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Reliable Service
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    With 99.9% uptime, you can trust our platform to be
                    available when you and your customers need it.
                  </p>
                </div>

                {/* Reason 3 */}
                <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Dedicated Support
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our customer support team is available to help you with any
                    questions or issues you may encounter.
                  </p>
                </div>

                {/* Reason 4 */}
                <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Customizable
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Tailor the booking experience to match your brand and
                    specific business requirements.
                  </p>
                </div>

                {/* Reason 5 */}
                <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Secure
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Your data and your customers' information are protected with
                    enterprise-grade security measures.
                  </p>
                </div>

                {/* Reason 6 */}
                <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Constantly Improving
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We regularly update our platform with new features and
                    improvements based on customer feedback.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-blue-600 dark:bg-blue-700">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold text-white mb-6">
                Ready to Transform Your Booking Experience?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Join thousands of businesses that have streamlined their booking
                process with our platform.
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-white text-blue-600 px-8 py-4 rounded-md text-lg font-medium hover:bg-blue-50"
              >
                Get Started Today
              </button>
            </div>
          </section>

          {/* Footer */}
          <footer id="contact" className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Rafiq Al Sahab</h3>
                  <p className="text-gray-400 mb-4">
                    Innovative booking solutions for modern businesses.
                  </p>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-white">
                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white">
                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white">
                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                      </svg>
                    </a>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="#features"
                        className="text-gray-400 hover:text-white"
                      >
                        Features
                      </a>
                    </li>
                    <li>
                      <a
                        href="#pricing"
                        className="text-gray-400 hover:text-white"
                      >
                        Pricing
                      </a>
                    </li>
                    <li>
                      <a
                        href="#about"
                        className="text-gray-400 hover:text-white"
                      >
                        About Us
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-400 hover:text-white">
                        Blog
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Support</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="text-gray-400 hover:text-white">
                        Help Center
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-400 hover:text-white">
                        Documentation
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-400 hover:text-white">
                        API Reference
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-400 hover:text-white">
                        Contact Support
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg
                        className="h-6 w-6 text-gray-400 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                      </svg>
                      <span className="text-gray-400">
                        Dubai, United Arab Emirates
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-6 w-6 text-gray-400 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        ></path>
                      </svg>
                      <span className="text-gray-400">
                        info@rafiqalsahab.com
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-6 w-6 text-gray-400 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        ></path>
                      </svg>
                      <span className="text-gray-400">+971 XX XXX XXXX</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                <p>
                  &copy; {new Date().getFullYear()} Rafiq Al Sahab Technology
                  L.L.C. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  )
}
