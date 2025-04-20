"use client"

import type React from "react"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Upload, CreditCard, Info, Clock, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"

const MAX_FILE_SIZE = 5000000 // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"]

const formSchema = z.object({
  // Business Information
  businessName: z.string().min(2, { message: "Business name is required" }),
  businessType: z.string().min(2, { message: "Business type is required" }),
  businessAddress: z.string().min(5, { message: "Business address is required" }),
  phoneNumber: z.string().min(8, { message: "Valid phone number is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  socialLink: z.string().url({ message: "Valid URL is required" }),

  // Availability
  workingDays: z.array(z.string()).min(1, { message: "Select at least one working day" }),
  workingHours: z.string().min(2, { message: "Working hours are required" }),
  holidays: z.string().optional(),

  // Logo Upload - will be handled separately

  // Plan Selection
  plan: z.enum(["basic", "premium"], { required_error: "Please select a plan" }),

  // Payment Method
  paymentMethod: z.enum(["bank", "cash", "online"], { required_error: "Please select a payment method" }),
  paymentNotes: z.string().optional(),

  // Agreement
  agreement: z.boolean().refine((val) => val === true, { message: "You must agree to the terms" }),
})

const daysOfWeek = [
  { id: "saturday", label: "Saturday" },
  { id: "sunday", label: "Sunday" },
  { id: "monday", label: "Monday" },
  { id: "tuesday", label: "Tuesday" },
  { id: "wednesday", label: "Wednesday" },
  { id: "thursday", label: "Thursday" },
  { id: "friday", label: "Friday" },
]

export default function BookingForm() {
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
    },
  })

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "Error",
        description: "File size should be less than 5MB",
        variant: "destructive",
      })
      return
    }

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      toast({
        title: "Error",
        description: "Only JPG and PNG files are accepted",
        variant: "destructive",
      })
      return
    }

    setLogoFile(file)
    const reader = new FileReader()
    reader.onload = () => {
      setLogoPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real application, you would handle the form submission here
    // including the logo file upload

    console.log(values)
    console.log("Logo file:", logoFile)

    toast({
      title: "Form submitted",
      description: "Thank you for your submission. We'll be in touch soon.",
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-4xl mx-auto">
        <Tabs defaultValue="business" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="business">
              <Info className="mr-2 h-4 w-4" />
              Business Info
            </TabsTrigger>
            <TabsTrigger value="availability">
              <Clock className="mr-2 h-4 w-4" />
              Availability
            </TabsTrigger>
            <TabsTrigger value="plans">
              <CreditCard className="mr-2 h-4 w-4" />
              Plans & Payment
            </TabsTrigger>
            <TabsTrigger value="agreement">
              <CheckCircle className="mr-2 h-4 w-4" />
              Agreement
            </TabsTrigger>
          </TabsList>

          <TabsContent value="business">
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>Provide details about your business for the booking system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Business Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="businessType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Type</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Salon, Clinic, Consultancy" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="businessAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Address</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Your business address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="+971 XX XXX XXXX" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="socialLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instagram or WhatsApp Link</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://instagram.com/yourbusiness or https://wa.me/971XXXXXXXX"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <FormLabel>Business Logo</FormLabel>
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
                            <Upload className="w-8 h-8 mb-2" />
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
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="button" onClick={() => document.querySelector('[data-value="availability"]')?.click()}>
                  Next: Availability
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="availability">
            <Card>
              <CardHeader>
                <CardTitle>Availability</CardTitle>
                <CardDescription>Set your working days and hours for the booking system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="workingDays"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Working Days</FormLabel>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                        {daysOfWeek.map((day) => (
                          <div key={day.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`day-${day.id}`}
                              checked={field.value?.includes(day.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, day.id])
                                  : field.onChange(field.value?.filter((value) => value !== day.id))
                              }}
                            />
                            <label
                              htmlFor={`day-${day.id}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {day.label}
                            </label>
                          </div>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="workingHours"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Daily Working Hours</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 9:00 AM - 6:00 PM" {...field} />
                      </FormControl>
                      <FormDescription>Specify your regular working hours</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="holidays"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Holidays or Exceptions (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g. Closed on public holidays, Annual leave from 15-30 August"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>List any regular holidays or exceptional closures</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.querySelector('[data-value="business"]')?.click()}
                >
                  Back
                </Button>
                <Button type="button" onClick={() => document.querySelector('[data-value="plans"]')?.click()}>
                  Next: Plans & Payment
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="plans">
            <Card>
              <CardHeader>
                <CardTitle>Plan Selection & Payment</CardTitle>
                <CardDescription>Choose your subscription plan and payment method</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="plan"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Select Your Plan</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
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
                              <p className="text-sm text-muted-foreground">
                                • Full online booking website + mobile booking app
                                <br />• Up to 100 bookings/month (expandable on request)
                                <br />• WhatsApp integration + 100 WhatsApp Business credits
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
                              <p className="text-sm text-muted-foreground">
                                • All Basic Plan features
                                <br />• Up to 500 bookings/month
                                <br />• Includes direct online payment during booking
                              </p>
                            </div>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator className="my-4" />

                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Payment Method</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
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
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="paymentNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Notes (Optional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Any additional information about your payment" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.querySelector('[data-value="availability"]')?.click()}
                >
                  Back
                </Button>
                <Button type="button" onClick={() => document.querySelector('[data-value="agreement"]')?.click()}>
                  Next: Agreement
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="agreement">
            <Card>
              <CardHeader>
                <CardTitle>Service Agreement</CardTitle>
                <CardDescription>Please review and accept the service agreement</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted p-4 rounded-md max-h-80 overflow-y-auto text-sm">
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
                    <br />- Deliver the solution using publicly available platforms (e.g., SimplyBook, Tally) as a
                    managed configuration.
                    <br />
                    The service is limited to the configuration and handover of the booking link. Any content, branding,
                    and operational settings are based on the Client's submitted information.
                  </p>

                  <p className="font-medium mb-2">2. Use of Third-Party Providers</p>
                  <p className="mb-4">
                    The Client acknowledges and agrees that:
                    <br />- The booking system is hosted and maintained by an independent third-party provider.
                    <br />- The Service Provider acts solely as a service configurator and administrator and does not
                    own, develop, or control the underlying booking technology.
                    <br />- The Client shall be subject to the third-party provider's terms of service and privacy
                    policy.
                  </p>

                  <p className="font-medium mb-2">3. Data Responsibility</p>
                  <p className="mb-4">
                    - The Client is solely responsible for the accuracy and completeness of all business information,
                    availability schedules, and uploaded assets (logos, names, descriptions).
                    <br />- The Service Provider will use the submitted data solely to complete the requested service
                    and will not share it externally without consent.
                  </p>

                  <p className="font-medium mb-2">4. Limitations of Liability</p>
                  <p className="mb-4">
                    The Service Provider shall not be held liable for:
                    <br />- Any system downtime, performance issues, or functional limitations of the third-party
                    provider.
                    <br />- Losses, cancellations, missed appointments, or business impact caused by incorrect use of
                    the platform or technical failures beyond its control.
                    <br />- Any indirect, incidental, or consequential damages arising from the use of the service.
                  </p>

                  <p className="font-medium mb-2">5. Payment and Refunds</p>
                  <p className="mb-4">
                    - The service fee is one-time and non-refundable once work has commenced.
                    <br />- Any additional modifications outside the scope of the initial request may be subject to
                    extra fees.
                  </p>

                  <p className="font-medium mb-2">6. Acceptance of Terms</p>
                  <p>
                    By checking the box below and submitting the form, the Client:
                    <br />- Confirms that they have read, understood, and agreed to this Agreement.
                    <br />- Acknowledges that the Service Provider will execute the requested setup using third-party
                    tools under the terms described herein.
                    <br />- Grants permission to use the submitted data to configure and deploy the service
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="agreement"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>I have read and agree to the terms of the Service Agreement</FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.querySelector('[data-value="plans"]')?.click()}
                >
                  Back
                </Button>
                <Button type="submit">Submit Application</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  )
}
