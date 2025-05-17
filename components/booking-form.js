"use client"
import { useState } from "react"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DaysTimePicker } from "@/components/ui/day-time-picker"

export function BookingForm() {
  const [activeTab, setActiveTab] = useState("business")
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    businessAddress: "",
    phoneNumber: "",
    email: "",
    socialLink: "",
    workingDays: [
      {
        id: "monday",
        label: "Monday",
        enabled: true,
        startTime: "09:00 AM",
        endTime: "05:00 PM"
      },
      {
        id: "tuesday",
        label: "Tuesday",
        enabled: true,
        startTime: "09:00 AM",
        endTime: "05:00 PM"
      },
      {
        id: "wednesday",
        label: "Wednesday",
        enabled: true,
        startTime: "09:00 AM",
        endTime: "05:00 PM"
      },
      {
        id: "thursday",
        label: "Thursday",
        enabled: true,
        startTime: "09:00 AM",
        endTime: "05:00 PM"
      },
      {
        id: "friday",
        label: "Friday",
        enabled: true,
        startTime: "09:00 AM",
        endTime: "05:00 PM"
      },
      {
        id: "saturday",
        label: "Saturday",
        enabled: false,
        startTime: "09:00 AM",
        endTime: "05:00 PM"
      },
      {
        id: "sunday",
        label: "Sunday",
        enabled: false,
        startTime: "09:00 AM",
        endTime: "05:00 PM"
      }
    ],
    holidays: "",
    plan: "basic",
    paymentMethod: "bank",
    paymentNotes: "",
    agreement: false
  })
  const [logoFile, setLogoFile] = useState(null)
  const [logoPreview, setLogoPreview] = useState(null)
  const [errors, setErrors] = useState({})
  const [dayErrors, setDayErrors] = useState({})

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleCheckboxChange = e => {
    const { name, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: checked }))

    // Clear error when user checks
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleWorkingDaysChange = days => {
    setFormData(prev => ({ ...prev, workingDays: days }))

    // Validate time ranges
    const newDayErrors = {}

    days.forEach(day => {
      if (day.enabled) {
        const isValid = validateTimeRange(day.startTime, day.endTime)
        if (!isValid) {
          newDayErrors[day.id] = { range: "End time must be after start time" }
        }
      }
    })

    setDayErrors(newDayErrors)
  }

  const validateTimeRange = (start, end) => {
    // Parse times for comparison
    const [startTime, startPeriod] = start.split(" ")
    const [endTime, endPeriod] = end.split(" ")

    const [startHour, startMinute] = startTime.split(":")
    const [endHour, endMinute] = endTime.split(":")

    const startDate = new Date()
    startDate.setHours(
      startPeriod === "PM" && startHour !== "12"
        ? Number.parseInt(startHour) + 12
        : startPeriod === "AM" && startHour === "12"
        ? 0
        : Number.parseInt(startHour),
      Number.parseInt(startMinute)
    )

    const endDate = new Date()
    endDate.setHours(
      endPeriod === "PM" && endHour !== "12"
        ? Number.parseInt(endHour) + 12
        : endPeriod === "AM" && endHour === "12"
        ? 0
        : Number.parseInt(endHour),
      Number.parseInt(endMinute)
    )

    return endDate > startDate
  }

  const handleRadioChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleLogoChange = e => {
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
      setLogoPreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const validateForm = () => {
    const newErrors = {}

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
      newErrors.socialLink =
        "Please enter a valid URL starting with http:// or https://"
    }

    // Availability
    const enabledDays = formData.workingDays.filter(day => day.enabled)
    if (enabledDays.length === 0) {
      newErrors.workingDays = "Select at least one working day"
    }

    // Check if there are any day time range errors
    const hasTimeRangeErrors = Object.keys(dayErrors).length > 0
    if (hasTimeRangeErrors) {
      newErrors.workingDays = "Please fix the time range errors"
    }

    // Agreement
    if (!formData.agreement) {
      newErrors.agreement = "You must agree to the terms"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = e => {
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
      } else if (errors.workingDays) {
        setActiveTab("availability")
      } else if (errors.agreement) {
        setActiveTab("agreement")
      }
    }
  }

  return (
    <Form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
  
        <Tabs
          defaultValue="business"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="business">Business Info</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
            <TabsTrigger value="plans">Plans & Payment</TabsTrigger>
            <TabsTrigger value="agreement">Agreement</TabsTrigger>
          </TabsList>

          <TabsContent value="business">
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>
                  Provide details about your business for the booking system
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  name="businessName"
                  render={() => (
                    <FormItem>
                      <FormLabel htmlFor="businessName">
                        Business Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="businessName"
                          name="businessName"
                          value={formData.businessName}
                          onChange={handleInputChange}
                          className={
                            errors.businessName ? "border-red-500" : ""
                          }
                          placeholder="Your Business Name"
                        />
                      </FormControl>
                      {errors.businessName && (
                        <FormMessage>{errors.businessName}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  name="businessType"
                  render={() => (
                    <FormItem>
                      <FormLabel htmlFor="businessType">
                        Business Type
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="businessType"
                          name="businessType"
                          value={formData.businessType}
                          onChange={handleInputChange}
                          className={
                            errors.businessType ? "border-red-500" : ""
                          }
                          placeholder="e.g. Salon, Clinic, Consultancy"
                        />
                      </FormControl>
                      {errors.businessType && (
                        <FormMessage>{errors.businessType}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  name="businessAddress"
                  render={() => (
                    <FormItem>
                      <FormLabel htmlFor="businessAddress">
                        Business Address
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          id="businessAddress"
                          name="businessAddress"
                          value={formData.businessAddress}
                          onChange={handleInputChange}
                          className={
                            errors.businessAddress ? "border-red-500" : ""
                          }
                          placeholder="Your business address"
                        />
                      </FormControl>
                      {errors.businessAddress && (
                        <FormMessage>{errors.businessAddress}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    name="phoneNumber"
                    render={() => (
                      <FormItem>
                        <FormLabel htmlFor="phoneNumber">
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="phoneNumber"
                            name="phoneNumber"
                            type="tel"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            className={
                              errors.phoneNumber ? "border-red-500" : ""
                            }
                            placeholder="+971 XX XXX XXXX"
                          />
                        </FormControl>
                        {errors.phoneNumber && (
                          <FormMessage>{errors.phoneNumber}</FormMessage>
                        )}
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="email"
                    render={() => (
                      <FormItem>
                        <FormLabel htmlFor="email">Email Address</FormLabel>
                        <FormControl>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={errors.email ? "border-red-500" : ""}
                            placeholder="your@email.com"
                          />
                        </FormControl>
                        {errors.email && (
                          <FormMessage>{errors.email}</FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  name="socialLink"
                  render={() => (
                    <FormItem>
                      <FormLabel htmlFor="socialLink">
                        Instagram or WhatsApp Link
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="socialLink"
                          name="socialLink"
                          type="url"
                          value={formData.socialLink}
                          onChange={handleInputChange}
                          className={errors.socialLink ? "border-red-500" : ""}
                          placeholder="https://instagram.com/yourbusiness or https://wa.me/971XXXXXXXX"
                        />
                      </FormControl>
                      {errors.socialLink && (
                        <FormMessage>{errors.socialLink}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />

                <div>
                  <FormLabel>Business Logo</FormLabel>
                  <div className="mt-2 flex items-center gap-4">
                    <label htmlFor="logo-upload" className="cursor-pointer">
                      <div className="flex items-center justify-center w-40 h-40 border-2 border-dashed rounded-md border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
                        {logoPreview ? (
                          <img
                            src={logoPreview || "/placeholder.svg"}
                            alt="Logo preview"
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
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
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <p>Upload your business logo (PNG or JPG)</p>
                      <p>Maximum file size: 5MB</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveTab("availability")}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                >
                  Next: Availability
                </button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="availability">
            <Card>
              <CardHeader>
                <CardTitle>Availability</CardTitle>
                <CardDescription>
                  Set your working days and hours for the booking system
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  name="workingDays"
                  render={() => (
                    <FormItem>
                      <FormLabel>Working Days & Hours</FormLabel>
                      <FormControl>
                        <DaysTimePicker
                          days={formData.workingDays}
                          onDaysChange={handleWorkingDaysChange}
                          errors={dayErrors}
                        />
                      </FormControl>
                      {errors.workingDays && (
                        <FormMessage>{errors.workingDays}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  name="holidays"
                  render={() => (
                    <FormItem>
                      <FormLabel htmlFor="holidays">
                        Holidays or Exceptions (Optional)
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          id="holidays"
                          name="holidays"
                          value={formData.holidays}
                          onChange={handleInputChange}
                          placeholder="e.g. Closed on public holidays, Annual leave from 15-30 August"
                        />
                      </FormControl>
                      <FormDescription>
                        List any regular holidays or exceptional closures
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setActiveTab("business")}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("plans")}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                >
                  Next: Plans & Payment
                </button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="plans">
            <Card>
              <CardHeader>
                <CardTitle>Plan Selection & Payment</CardTitle>
                <CardDescription>
                  Choose your subscription plan and payment method
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  name="plan"
                  render={() => (
                    <FormItem className="space-y-3">
                      <FormLabel>Select Your Plan</FormLabel>
                      <FormControl>
                        <RadioGroup
                          value={formData.plan}
                          onValueChange={value =>
                            handleRadioChange("plan", value)
                          }
                          className="flex flex-col space-y-4"
                        >
                          <div className="flex items-start space-x-3 space-y-0">
                            <RadioGroupItem value="basic" id="basic" />
                            <div className="grid gap-1.5 leading-none">
                              <label
                                htmlFor="basic"
                                className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                🔹 Basic Plan - 169 AED/month
                              </label>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                • Full online booking website + mobile booking
                                app
                                <br />• Up to 100 bookings/month (expandable on
                                request)
                                <br />• WhatsApp integration + 100 WhatsApp
                                Business credits
                                <br />• 15% discount for annual subscription
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-3 space-y-0">
                            <RadioGroupItem value="premium" id="premium" />
                            <div className="grid gap-1.5 leading-none">
                              <label
                                htmlFor="premium"
                                className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                🔸 Premium Plan - 399 AED/month
                              </label>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                • All Basic Plan features
                                <br />• Up to 500 bookings/month
                                <br />• Includes direct online payment during
                                booking
                              </p>
                            </div>
                          </div>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Separator className="my-4" />

                <FormField
                  name="paymentMethod"
                  render={() => (
                    <FormItem className="space-y-3">
                      <FormLabel>Payment Method</FormLabel>
                      <FormControl>
                        <RadioGroup
                          value={formData.paymentMethod}
                          onValueChange={value =>
                            handleRadioChange("paymentMethod", value)
                          }
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-3 space-y-0">
                            <RadioGroupItem value="bank" id="bank" />
                            <label
                              htmlFor="bank"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Bank Transfer
                            </label>
                          </div>
                          <div className="flex items-center space-x-3 space-y-0">
                            <RadioGroupItem value="cash" id="cash" />
                            <label
                              htmlFor="cash"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Cash
                            </label>
                          </div>
                          <div className="flex items-center space-x-3 space-y-0">
                            <RadioGroupItem value="online" id="online" />
                            <label
                              htmlFor="online"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Online Payment Link
                            </label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  name="paymentNotes"
                  render={() => (
                    <FormItem>
                      <FormLabel htmlFor="paymentNotes">
                        Payment Notes (Optional)
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          id="paymentNotes"
                          name="paymentNotes"
                          value={formData.paymentNotes}
                          onChange={handleInputChange}
                          placeholder="Any additional information about your payment"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setActiveTab("availability")}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("agreement")}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                >
                  Next: Agreement
                </button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="agreement">
            <Card>
              <CardHeader>
                <CardTitle>Service Agreement</CardTitle>
                <CardDescription>
                  Please review and accept the service agreement
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md max-h-80 overflow-y-auto text-sm">
                  <p className="mb-4">
                    This Service Agreement ("Agreement") is entered into by and
                    between:
                    <br />
                    Rafiq Al Sahab Technology L.L.C, a UAE-registered entity
                    ("Service Provider"), and
                    <br />
                    the Client submitting this form ("Client").
                    <br />
                    By submitting this form and checking the consent box below,
                    the Client agrees to the terms outlined herein.
                  </p>

                  <p className="font-medium mb-2">1. Scope of Work</p>
                  <p className="mb-4">
                    The Service Provider agrees to:
                    <br />- Set up a custom online booking page tailored to the
                    Client's business.
                    <br />- Integrate the page with a third-party booking system
                    to enable scheduling of appointments.
                    <br />- Deliver the solution using publicly available
                    platforms (e.g., SimplyBook, Tally) as a managed
                    configuration.
                    <br />
                    The service is limited to the configuration and handover of
                    the booking link. Any content, branding, and operational
                    settings are based on the Client's submitted information.
                  </p>

                  <p className="font-medium mb-2">
                    2. Use of Third-Party Providers
                  </p>
                  <p className="mb-4">
                    The Client acknowledges and agrees that:
                    <br />- The booking system is hosted and maintained by an
                    independent third-party provider.
                    <br />- The Service Provider acts solely as a service
                    configurator and administrator and does not own, develop, or
                    control the underlying booking technology.
                    <br />- The Client shall be subject to the third-party
                    provider's terms of service and privacy policy.
                  </p>

                  <p className="font-medium mb-2">3. Data Responsibility</p>
                  <p className="mb-4">
                    - The Client is solely responsible for the accuracy and
                    completeness of all business information, availability
                    schedules, and uploaded assets (logos, names, descriptions).
                    <br />- The Service Provider will use the submitted data
                    solely to complete the requested service and will not share
                    it externally without consent.
                  </p>

                  <p className="font-medium mb-2">
                    4. Limitations of Liability
                  </p>
                  <p className="mb-4">
                    The Service Provider shall not be held liable for:
                    <br />- Any system downtime, performance issues, or
                    functional limitations of the third-party provider.
                    <br />- Losses, cancellations, missed appointments, or
                    business impact caused by incorrect use of the platform or
                    technical failures beyond its control.
                    <br />- Any indirect, incidental, or consequential damages
                    arising from the use of the service.
                  </p>

                  <p className="font-medium mb-2">5. Payment and Refunds</p>
                  <p className="mb-4">
                    - The service fee is one-time and non-refundable once work
                    has commenced.
                    <br />- Any additional modifications outside the scope of
                    the initial request may be subject to extra fees.
                  </p>

                  <p className="font-medium mb-2">6. Acceptance of Terms</p>
                  <p>
                    By checking the box below and submitting the form, the
                    Client:
                    <br />- Confirms that they have read, understood, and agreed
                    to this Agreement.
                    <br />- Acknowledges that the Service Provider will execute
                    the requested setup using third-party tools under the terms
                    described herein.
                    <br />- Grants permission to use the submitted data to
                    configure and deploy the service
                  </p>
                </div>

                <FormField
                  name="agreement"
                  render={() => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          id="agreement"
                          name="agreement"
                          checked={formData.agreement}
                          onChange={handleCheckboxChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel htmlFor="agreement">
                          I have read and agree to the terms of the Service
                          Agreement
                        </FormLabel>
                        {errors.agreement && (
                          <FormMessage>{errors.agreement}</FormMessage>
                        )}
                      </div>
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setActiveTab("plans")}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                >
                  Submit Application
                </button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
   
    </Form>
  )
}
