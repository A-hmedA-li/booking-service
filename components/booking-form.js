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
import { useTranslations } from "next-intl"
import { useLocale } from "next-intl"

export function BookingForm() {
  const t = useTranslations("form")
  const locale = useLocale()
  const isRtl = locale === "ar"

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
        label: t("availability.days.monday"),
        enabled: true,
        startTime: "09:00 AM",
        endTime: "05:00 PM"
      },
      {
        id: "tuesday",
        label: t("availability.days.tuesday"),
        enabled: true,
        startTime: "09:00 AM",
        endTime: "05:00 PM"
      },
      {
        id: "wednesday",
        label: t("availability.days.wednesday"),
        enabled: true,
        startTime: "09:00 AM",
        endTime: "05:00 PM"
      },
      {
        id: "thursday",
        label: t("availability.days.thursday"),
        enabled: true,
        startTime: "09:00 AM",
        endTime: "05:00 PM"
      },
      {
        id: "friday",
        label: t("availability.days.friday"),
        enabled: true,
        startTime: "09:00 AM",
        endTime: "05:00 PM"
      },
      {
        id: "saturday",
        label: t("availability.days.saturday"),
        enabled: false,
        startTime: "09:00 AM",
        endTime: "05:00 PM"
      },
      {
        id: "sunday",
        label: t("availability.days.sunday"),
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
          newDayErrors[day.id] = { range: t("timeError") }
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
      newErrors.businessName = t("business.name.error")
    }
    if (!formData.businessType.trim()) {
      newErrors.businessType = t("business.type.error")
    }
    if (!formData.businessAddress.trim()) {
      newErrors.businessAddress = t("business.address.error")
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = t("business.phone.error")
    }
    if (!formData.email.trim()) {
      newErrors.email = t("business.email.error")
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t("business.email.invalidError")
    }
    if (!formData.socialLink.trim()) {
      newErrors.socialLink = t("business.social.error")
    } else if (!/^https?:\/\/\S+/.test(formData.socialLink)) {
      newErrors.socialLink = t("business.social.invalidError")
    }

    // Availability
    const enabledDays = formData.workingDays.filter(day => day.enabled)
    if (enabledDays.length === 0) {
      newErrors.workingDays = t("availability.workingDays.error")
    }

    // Check if there are any day time range errors
    const hasTimeRangeErrors = Object.keys(dayErrors).length > 0
    if (hasTimeRangeErrors) {
      newErrors.workingDays = t("availability.workingDays.rangeError")
    }

    // Agreement
    if (!formData.agreement) {
      newErrors.agreement = t("agreement.error")
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
    <Form  onSubmit={handleSubmit}
        className={`space-y-8 max-w-4xl mx-auto ${isRtl ? "rtl" : "ltr"}`}>
 
       
      
        <Tabs
          defaultValue="business"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="business">{t("tabs.business")}</TabsTrigger>
            <TabsTrigger value="availability">
              {t("tabs.availability")}
            </TabsTrigger>
            <TabsTrigger value="plans">{t("tabs.plans")}</TabsTrigger>
            <TabsTrigger value="agreement">{t("tabs.agreement")}</TabsTrigger>
          </TabsList>

          <TabsContent value="business">
            <Card>
              <CardHeader>
                <CardTitle>{t("business.title")}</CardTitle>
                <CardDescription>{t("business.description")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  name="businessName"
                  render={() => (
                    <FormItem>
                      <FormLabel htmlFor="businessName">
                        {t("business.name.label")}
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
                          placeholder={t("business.name.placeholder")}
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
                        {t("business.type.label")}
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
                          placeholder={t("business.type.placeholder")}
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
                        {t("business.address.label")}
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
                          placeholder={t("business.address.placeholder")}
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
                          {t("business.phone.label")}
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
                            placeholder={t("business.phone.placeholder")}
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
                        <FormLabel htmlFor="email">
                          {t("business.email.label")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={errors.email ? "border-red-500" : ""}
                            placeholder={t("business.email.placeholder")}
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
                        {t("business.social.label")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="socialLink"
                          name="socialLink"
                          type="url"
                          value={formData.socialLink}
                          onChange={handleInputChange}
                          className={errors.socialLink ? "border-red-500" : ""}
                          placeholder={t("business.social.placeholder")}
                        />
                      </FormControl>
                      {errors.socialLink && (
                        <FormMessage>{errors.socialLink}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />

                <div>
                  <FormLabel>{t("business.logo.label")}</FormLabel>
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
                            <span className="text-sm">
                              {t("business.logo.upload")}
                            </span>
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
                      <p>{t("business.logo.description1")}</p>
                      <p>{t("business.logo.description2")}</p>
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
                  {t("business.next")}
                </button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="availability">
            <Card>
              <CardHeader>
                <CardTitle>{t("availability.title")}</CardTitle>
                <CardDescription>
                  {t("availability.description")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  name="workingDays"
                  render={() => (
                    <FormItem>
                      <FormLabel>
                        {t("availability.workingDays.label")}
                      </FormLabel>
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
                        {t("availability.holidays.label")}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          id="holidays"
                          name="holidays"
                          value={formData.holidays}
                          onChange={handleInputChange}
                          placeholder={t("availability.holidays.placeholder")}
                        />
                      </FormControl>
                      <FormDescription>
                        {t("availability.holidays.description")}
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
                  {t("availability.back")}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("plans")}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                >
                  {t("availability.next")}
                </button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="plans">
            <Card>
              <CardHeader>
                <CardTitle>{t("plans.title")}</CardTitle>
                <CardDescription>{t("plans.description")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  name="plan"
                  render={() => (
                    <FormItem className="space-y-3">
                      <FormLabel>{t("plans.selectPlan")}</FormLabel>
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
                                {t("plans.basicPlan.title")}
                              </label>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {t("plans.basicPlan.features.0")}
                                <br />• {t("plans.basicPlan.features.1")}
                                <br />• {t("plans.basicPlan.features.2")}
                                <br />• {t("plans.basicPlan.features.3")}
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
                                {t("plans.premiumPlan.title")}
                              </label>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {t("plans.premiumPlan.features.0")}
                                <br />• {t("plans.premiumPlan.features.1")}
                                <br />• {t("plans.premiumPlan.features.2")}
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
                      <FormLabel>{t("plans.paymentMethod.label")}</FormLabel>
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
                              {t("plans.paymentMethod.bank")}
                            </label>
                          </div>
                          <div className="flex items-center space-x-3 space-y-0">
                            <RadioGroupItem value="cash" id="cash" />
                            <label
                              htmlFor="cash"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {t("plans.paymentMethod.cash")}
                            </label>
                          </div>
                          <div className="flex items-center space-x-3 space-y-0">
                            <RadioGroupItem value="online" id="online" />
                            <label
                              htmlFor="online"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {t("plans.paymentMethod.online")}
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
                        {t("plans.paymentNotes.label")}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          id="paymentNotes"
                          name="paymentNotes"
                          value={formData.paymentNotes}
                          onChange={handleInputChange}
                          placeholder={t("plans.paymentNotes.placeholder")}
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
                  {t("plans.back")}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("agreement")}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                >
                  {t("plans.next")}
                </button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="agreement">
            <Card>
              <CardHeader>
                <CardTitle>{t("agreement.title")}</CardTitle>
                <CardDescription>{t("agreement.description")}</CardDescription>
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
                          {t("agreement.consent")}
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
                  {t("agreement.back")}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                >
                  {t("agreement.submit")}
                </button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
    
    </Form>
  )
}
