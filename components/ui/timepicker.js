"use client"
import { useState, useEffect } from "react"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Card } from "@/components/ui/card"

export function TimePicker({
  startLabel = "Start Time",
  endLabel = "End Time",
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
  className = "",
  error
}) {
  const [startHour, setStartHour] = useState("09")
  const [startMinute, setStartMinute] = useState("00")
  const [startPeriod, setStartPeriod] = useState("AM")

  const [endHour, setEndHour] = useState("05")
  const [endMinute, setEndMinute] = useState("00")
  const [endPeriod, setEndPeriod] = useState("PM")

  // Generate hours (1-12)
  const hours = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 1
    return hour < 10 ? `0${hour}` : `${hour}`
  })

  // Generate minutes (00, 15, 30, 45)
  const minutes = ["00", "15", "30", "45"]

  // Parse initial values on component mount
  useEffect(() => {
    if (startTime) {
      const [time, period] = startTime.split(" ")
      const [hour, minute] = time.split(":")
      setStartHour(hour)
      setStartMinute(minute)
      setStartPeriod(period)
    }

    if (endTime) {
      const [time, period] = endTime.split(" ")
      const [hour, minute] = time.split(":")
      setEndHour(hour)
      setEndMinute(minute)
      setEndPeriod(period)
    }
  }, [])

  // Update parent component when time changes
  useEffect(() => {
    const formattedStartTime = `${startHour}:${startMinute} ${startPeriod}`
    onStartTimeChange(formattedStartTime)
  }, [startHour, startMinute, startPeriod, onStartTimeChange])

  useEffect(() => {
    const formattedEndTime = `${endHour}:${endMinute} ${endPeriod}`
    onEndTimeChange(formattedEndTime)
  }, [endHour, endMinute, endPeriod, onEndTimeChange])

  const selectClasses =
    "flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}>
      <div>
        <FormField
          name="startTime"
          render={() => (
            <FormItem>
              <FormLabel>{startLabel}</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <select
                    value={startHour}
                    onChange={e => setStartHour(e.target.value)}
                    className={selectClasses}
                    aria-label="Hour"
                  >
                    {hours.map(hour => (
                      <option key={`start-hour-${hour}`} value={hour}>
                        {hour}
                      </option>
                    ))}
                  </select>
                  <span className="text-xl dark:text-gray-300">:</span>
                  <select
                    value={startMinute}
                    onChange={e => setStartMinute(e.target.value)}
                    className={selectClasses}
                    aria-label="Minute"
                  >
                    {minutes.map(minute => (
                      <option key={`start-minute-${minute}`} value={minute}>
                        {minute}
                      </option>
                    ))}
                  </select>
                  <select
                    value={startPeriod}
                    onChange={e => setStartPeriod(e.target.value)}
                    className={selectClasses}
                    aria-label="AM/PM"
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </FormControl>
              {error?.start && <FormMessage>{error.start}</FormMessage>}
            </FormItem>
          )}
        />
      </div>

      <div>
        <FormField
          name="endTime"
          render={() => (
            <FormItem>
              <FormLabel>{endLabel}</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <select
                    value={endHour}
                    onChange={e => setEndHour(e.target.value)}
                    className={selectClasses}
                    aria-label="Hour"
                  >
                    {hours.map(hour => (
                      <option key={`end-hour-${hour}`} value={hour}>
                        {hour}
                      </option>
                    ))}
                  </select>
                  <span className="text-xl dark:text-gray-300">:</span>
                  <select
                    value={endMinute}
                    onChange={e => setEndMinute(e.target.value)}
                    className={selectClasses}
                    aria-label="Minute"
                  >
                    {minutes.map(minute => (
                      <option key={`end-minute-${minute}`} value={minute}>
                        {minute}
                      </option>
                    ))}
                  </select>
                  <select
                    value={endPeriod}
                    onChange={e => setEndPeriod(e.target.value)}
                    className={selectClasses}
                    aria-label="AM/PM"
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </FormControl>
              {error?.end && <FormMessage>{error.end}</FormMessage>}
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}

export function TimeRangePicker({
  label = "Working Hours",
  description,
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
  className = "",
  error
}) {
  return (
    <Card className={`p-4 ${className}`}>
      <div className="mb-4">
        <h3 className="text-lg font-medium dark:text-gray-100">{label}</h3>
        {description && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>

      <TimePicker
        startLabel="From"
        endLabel="To"
        startTime={startTime}
        endTime={endTime}
        onStartTimeChange={onStartTimeChange}
        onEndTimeChange={onEndTimeChange}
        error={error}
      />

      {error?.range && (
        <p className="mt-2 text-sm font-medium text-red-500 dark:text-red-400">
          {error.range}
        </p>
      )}
    </Card>
  )
}
