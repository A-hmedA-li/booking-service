export default function Home() {
  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Online Booking System Setup</h1>
      <BookingForm />
    </main>
  )
}

function BookingForm() {
  return (
    <div className="max-w-4xl mx-auto">
      <SimplifiedBookingForm />
    </div>
  )
}

import { SimplifiedBookingForm } from "@/components/simplified-booking-form"
