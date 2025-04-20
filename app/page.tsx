"use client"

import { useState, type FormEvent, type ChangeEvent } from "react"

type FormData = {
  // Business Information
  businessName: string
  businessType: string
  businessAddress: string
  phoneNumber: string
  email: string
  socialLink: string

  // Availability
  workingDays: string[]
  workingHours: string
  holidays: string

  // Plan Selection
  plan: "basic" | "premium"

  // Payment Method
  paymentMethod: "bank" | "cash" | "online"
  paymentNotes: string

  // Agreement
  agreement: boolean
}

const daysOfWeek = [
  { id: "saturday", label: "Saturday" },
  { id: "sunday", label: "Sunday" },
  { id: "monday", label: "Monday" },
  { id: "tuesday", label: "Tuesday" },
  { id: "wednesday", label: "Wednesday" },
  { id: "thursday", label: "Thursday" },
  { id: "friday", label: "Friday" },
]

export function SimplifiedBookingForm() {
  const [activeTab, setActiveTab] = useState<string>("business")
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>({
    businessName: "",
    businessType: "",
    businessAddress: "",
    phoneNumber: "",
    email: "",
    socialLink: "",
    workingDays: [],
    workingHours: "",
    holidays: "",
    plan: "basic",
    paymentMethod: "bank",
    paymentNotes: "",
    agreement: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))

    // Clear error when user checks
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleWorkingDaysChange = (day: string, checked: boolean) => {
    setFormData((prev) => {
      const updatedDays = checked ? [...prev.workingDays, day] : prev.workingDays.filter((d) => d !== day)

      return { ...prev, workingDays: updatedDays }
    })

    // Clear error when user selects days
    if (errors.workingDays) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.workingDays
        return newErrors
      })
    }
  }

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size should be less than 5MB")
      return
    }

    // Validate file type
    if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      alert("Only JPG and PNG files are accepted")
      return
    }

    setLogoFile(file)
    const reader = new FileReader()
    reader.onload = () => {
      setLogoPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Business Information
    if (!formData.businessName.trim()) {
      newErrors.businessName = "Business name is required"
    }
    if (!formData.businessType.trim()) {
      newErrors.businessType = "Business type is required"
    }
    if (!formData.businessAddress.trim()) {
      newErrors.businessAddress = "Business address is required"
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required"
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }
    if (!formData.socialLink.trim()) {
      newErrors.socialLink = "Social link is required"
    } else if (!/^https?:\/\/\S+/.test(formData.socialLink)) {
      newErrors.socialLink = "Please enter a valid URL starting with http:// or https://"
    }

    // Availability
    if (formData.workingDays.length === 0) {
      newErrors.workingDays = "Select at least one working day"
    }
    if (!formData.workingHours.trim()) {
      newErrors.workingHours = "Working hours are required"
    }

    // Agreement
    if (!formData.agreement) {
      newErrors.agreement = "You must agree to the terms"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      // In a real application, you would handle the form submission here
      console.log("Form data:", formData)
      console.log("Logo file:", logoFile)

      alert("Thank you for your submission. We'll be in touch soon.")
    } else {
      // Find the first tab with an error and switch to it
      if (
        errors.businessName ||
        errors.businessType ||
        errors.businessAddress ||
        errors.phoneNumber ||
        errors.email ||
        errors.socialLink
      ) {
        setActiveTab("business")
      } else if (errors.workingDays || errors.workingHours) {
        setActiveTab("availability")
      } else if (errors.agreement) {
        setActiveTab("agreement")
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          <button
            type="button"
            onClick={() => setActiveTab("business")}
            className={`py-4 px-6 font-medium text-sm border-b-2 ${
              activeTab === "business"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Business Info
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("availability")}
            className={`py-4 px-6 font-medium text-sm border-b-2 ${
              activeTab === "availability"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Availability
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("plans")}
            className={`py-4 px-6 font-medium text-sm border-b-2 ${
              activeTab === "plans"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Plans & Payment
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("agreement")}
            className={`py-4 px-6 font-medium text-sm border-b-2 ${
              activeTab === "agreement"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Agreement
          </button>
        </nav>
      </div>

      {/* Business Information Tab */}
      <div className={activeTab === "business" ? "block" : "hidden"}>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-1">Business Information</h2>
          <p className="text-gray-500 mb-6">Provide details about your business for the booking system</p>

          <div className="space-y-6">
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
                Business Name
              </label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.businessName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Your Business Name"
              />
              {errors.businessName && <p className="mt-1 text-sm text-red-600">{errors.businessName}</p>}
            </div>

            <div>
              <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-1">
                Business Type
              </label>
              <input
                type="text"
                id="businessType"
                name="businessType"
                value={formData.businessType}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.businessType ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="e.g. Salon, Clinic, Consultancy"
              />
              {errors.businessType && <p className="mt-1 text-sm text-red-600">{errors.businessType}</p>}
            </div>

            <div>
              <label htmlFor="businessAddress" className="block text-sm font-medium text-gray-700 mb-1">
                Business Address
              </label>
              <textarea
                id="businessAddress"
                name="businessAddress"
                value={formData.businessAddress}
                onChange={handleInputChange}
                rows={3}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.businessAddress ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Your business address"
              />
              {errors.businessAddress && <p className="mt-1 text-sm text-red-600">{errors.businessAddress}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.phoneNumber ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="+971 XX XXX XXXX"
                />
                {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="your@email.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="socialLink" className="block text-sm font-medium text-gray-700 mb-1">
                Instagram or WhatsApp Link
              </label>
              <input
                type="url"
                id="socialLink"
                name="socialLink"
                value={formData.socialLink}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.socialLink ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="https://instagram.com/yourbusiness or https://wa.me/971XXXXXXXX"
              />
              {errors.socialLink && <p className="mt-1 text-sm text-red-600">{errors.socialLink}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Logo</label>
              <div className="mt-2 flex items-center gap-4">
                <label htmlFor="logo-upload" className="cursor-pointer">
                  <div className="flex items-center justify-center w-40 h-40 border-2 border-dashed rounded-md border-gray-300 hover:border-gray-400 transition-colors">
                    {logoPreview ? (
                      <img
                        src={logoPreview || "/placeholder.svg"}
                        alt="Logo preview"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 mb-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <span className="text-sm">Upload Logo</span>
                      </div>
                    )}
                  </div>
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    className="sr-only"
                    onChange={handleLogoChange}
                  />
                </label>
                <div className="text-sm text-gray-500">
                  <p>Upload your business logo (PNG or JPG)</p>
                  <p>Maximum file size: 5MB</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={() => setActiveTab("availability")}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Next: Availability
            </button>
          </div>
        </div>
      </div>

      {/* Availability Tab */}
      <div className={activeTab === "availability" ? "block" : "hidden"}>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-1">Availability</h2>
          <p className="text-gray-500 mb-6">Set your working days and hours for the booking system</p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Working Days</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {daysOfWeek.map((day) => (
                  <div key={day.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`day-${day.id}`}
                      checked={formData.workingDays.includes(day.id)}
                      onChange={(e) => handleWorkingDaysChange(day.id, e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`day-${day.id}`} className="text-sm font-medium text-gray-700">
                      {day.label}
                    </label>
                  </div>
                ))}
              </div>
              {errors.workingDays && <p className="mt-1 text-sm text-red-600">{errors.workingDays}</p>}
            </div>

            <div>
              <label htmlFor="workingHours" className="block text-sm font-medium text-gray-700 mb-1">
                Daily Working Hours
              </label>
              <input
                type="text"
                id="workingHours"
                name="workingHours"
                value={formData.workingHours}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.workingHours ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="e.g. 9:00 AM - 6:00 PM"
              />
              <p className="mt-1 text-sm text-gray-500">Specify your regular working hours</p>
              {errors.workingHours && <p className="mt-1 text-sm text-red-600">{errors.workingHours}</p>}
            </div>

            <div>
              <label htmlFor="holidays" className="block text-sm font-medium text-gray-700 mb-1">
                Holidays or Exceptions (Optional)
              </label>
              <textarea
                id="holidays"
                name="holidays"
                value={formData.holidays}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="e.g. Closed on public holidays, Annual leave from 15-30 August"
              />
              <p className="mt-1 text-sm text-gray-500">List any regular holidays or exceptional closures</p>
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={() => setActiveTab("business")}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("plans")}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Next: Plans & Payment
            </button>
          </div>
        </div>
      </div>

      {/* Plans & Payment Tab */}
      <div className={activeTab === "plans" ? "block" : "hidden"}>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-1">Plan Selection & Payment</h2>
          <p className="text-gray-500 mb-6">Choose your subscription plan and payment method</p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Select Your Plan</label>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <input
                    type="radio"
                    id="basic"
                    name="plan"
                    value="basic"
                    checked={formData.plan === "basic"}
                    onChange={() => handleRadioChange("plan", "basic")}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <div>
                    <label htmlFor="basic" className="text-base font-medium text-gray-900">
                      🔹 Basic Plan - 169 AED/month
                    </label>
                    <p className="text-sm text-gray-500">
                      • Full online booking website + mobile booking app
                      <br />• Up to 100 bookings/month (expandable on request)
                      <br />• WhatsApp integration + 100 WhatsApp Business credits
                      <br />• 15% discount for annual subscription
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="radio"
                    id="premium"
                    name="plan"
                    value="premium"
                    checked={formData.plan === "premium"}
                    onChange={() => handleRadioChange("plan", "premium")}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <div>
                    <label htmlFor="premium" className="text-base font-medium text-gray-900">
                      🔸 Premium Plan - 399 AED/month
                    </label>
                    <p className="text-sm text-gray-500">
                      • All Basic Plan features
                      <br />• Up to 500 bookings/month
                      <br />• Includes direct online payment during booking
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <hr className="my-6" />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="bank"
                    name="paymentMethod"
                    value="bank"
                    checked={formData.paymentMethod === "bank"}
                    onChange={() => handleRadioChange("paymentMethod", "bank")}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor="bank" className="text-sm font-medium text-gray-700">
                    Bank Transfer
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="cash"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === "cash"}
                    onChange={() => handleRadioChange("paymentMethod", "cash")}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor="cash" className="text-sm font-medium text-gray-700">
                    Cash
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="online"
                    name="paymentMethod"
                    value="online"
                    checked={formData.paymentMethod === "online"}
                    onChange={() => handleRadioChange("paymentMethod", "online")}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor="online" className="text-sm font-medium text-gray-700">
                    Online Payment Link
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="paymentNotes" className="block text-sm font-medium text-gray-700 mb-1">
                Payment Notes (Optional)
              </label>
              <textarea
                id="paymentNotes"
                name="paymentNotes"
                value={formData.paymentNotes}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Any additional information about your payment"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={() => setActiveTab("availability")}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("agreement")}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Next: Agreement
            </button>
          </div>
        </div>
      </div>

      {/* Agreement Tab */}
      <div className={activeTab === "agreement" ? "block" : "hidden"}>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-1">Service Agreement</h2>
          <p className="text-gray-500 mb-6">Please review and accept the service agreement</p>

          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-md max-h-80 overflow-y-auto text-sm">
              <p className="mb-4">
                This Service Agreement ("Agreement") is entered into by and between:
                <br />
                Rafiq Al Sahab Technology L.L.C, a UAE-registered entity ("Service Provider"), and
                <br />
                the Client submitting this form ("Client").
                <br />
                By submitting this form and checking the consent box below, the Client agrees to the terms outlined
                herein.
              </p>

              <p className="font-medium mb-2">1. Scope of Work</p>
              <p className="mb-4">
                The Service Provider agrees to:
                <br />- Set up a custom online booking page tailored to the Client's business.
                <br />- Integrate the page with a third-party booking system to enable scheduling of appointments.
                <br />- Deliver the solution using publicly available platforms (e.g., SimplyBook, Tally) as a managed
                configuration.
                <br />
                The service is limited to the configuration and handover of the booking link. Any content, branding, and
                operational settings are based on the Client's submitted information.
              </p>

              <p className="font-medium mb-2">2. Use of Third-Party Providers</p>
              <p className="mb-4">
                The Client acknowledges and agrees that:
                <br />- The booking system is hosted and maintained by an independent third-party provider.
                <br />- The Service Provider acts solely as a service configurator and administrator and does not own,
                develop, or control the underlying booking technology.
                <br />- The Client shall be subject to the third-party provider's terms of service and privacy policy.
              </p>

              <p className="font-medium mb-2">3. Data Responsibility</p>
              <p className="mb-4">
                - The Client is solely responsible for the accuracy and completeness of all business information,
                availability schedules, and uploaded assets (logos, names, descriptions).
                <br />- The Service Provider will use the submitted data solely to complete the requested service and
                will not share it externally without consent.
              </p>

              <p className="font-medium mb-2">4. Limitations of Liability</p>
              <p className="mb-4">
                The Service Provider shall not be held liable for:
                <br />- Any system downtime, performance issues, or functional limitations of the third-party provider.
                <br />- Losses, cancellations, missed appointments, or business impact caused by incorrect use of the
                platform or technical failures beyond its control.
                <br />- Any indirect, incidental, or consequential damages arising from the use of the service.
              </p>

              <p className="font-medium mb-2">5. Payment and Refunds</p>
              <p className="mb-4">
                - The service fee is one-time and non-refundable once work has commenced.
                <br />- Any additional modifications outside the scope of the initial request may be subject to extra
                fees.
              </p>

              <p className="font-medium mb-2">6. Acceptance of Terms</p>
              <p>
                By checking the box below and submitting the form, the Client:
                <br />- Confirms that they have read, understood, and agreed to this Agreement.
                <br />- Acknowledges that the Service Provider will execute the requested setup using third-party tools
                under the terms described herein.
                <br />- Grants permission to use the submitted data to configure and deploy the service
              </p>
            </div>

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="agreement"
                name="agreement"
                checked={formData.agreement}
                onChange={handleCheckboxChange}
                className={`mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${
                  errors.agreement ? "border-red-500" : ""
                }`}
              />
              <div>
                <label htmlFor="agreement" className="text-sm font-medium text-gray-700">
                  I have read and agree to the terms of the Service Agreement
                </label>
                {errors.agreement && <p className="mt-1 text-sm text-red-600">{errors.agreement}</p>}
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={() => setActiveTab("plans")}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit Application
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
