"use client"
import * as React from "react"
import { useState, useEffect } from "react"

export function SingleTimePicker({
  label,
  time,
  onTimeChange,
  className = "",
  error
}) {
  const [hour, setHour] = useState("09")
  const [minute, setMinute] = useState("00")
  const [period, setPeriod] = useState("AM")

  // Generate hours (1-12)
  const hours = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 1
    return hour < 10 ? `0${hour}` : `${hour}`
  })

  // Generate minutes (00, 15, 30, 45)
  const minutes = ["00", "15", "30", "45"]

  // Parse initial values on component mount or when time changes
  useEffect(() => {
    if (time) {
      const [timeStr, periodStr] = time.split(" ")
      const [hourStr, minuteStr] = timeStr.split(":")
      setHour(hourStr)
      setMinute(minuteStr)
      setPeriod(periodStr)
    }
  }, [time])

  // Update parent component when time changes
  useEffect(() => {
    const formattedTime = `${hour}:${minute} ${period}`
    if (formattedTime !== time) {
      onTimeChange(formattedTime)
    }
  }, [hour, minute, period, onTimeChange, time])

  const selectClasses =
    "flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"

  return (
    <div className={`${className}`}>
      {label && (
        <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </span>
      )}
      <div className="flex items-center space-x-2">
        <select
          value={hour}
          onChange={e => setHour(e.target.value)}
          className={selectClasses}
          aria-label="Hour"
        >
          {hours.map(h => (
            <option key={`hour-${h}`} value={h}>
              {h}
            </option>
          ))}
        </select>
        <span className="text-xl dark:text-gray-300">:</span>
        <select
          value={minute}
          onChange={e => setMinute(e.target.value)}
          className={selectClasses}
          aria-label="Minute"
        >
          {minutes.map(m => (
            <option key={`minute-${m}`} value={m}>
              {m}
            </option>
          ))}
        </select>
        <select
          value={period}
          onChange={e => setPeriod(e.target.value)}
          className={selectClasses}
          aria-label="AM/PM"
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
      {error && (
        <p className="mt-1 text-sm font-medium text-red-500 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}

export function DayTimePicker({ day, onDayChange, error }) {
  const handleCheckboxChange = e => {
    onDayChange({
      ...day,
      enabled: e.target.checked
    })
  }

  const handleStartTimeChange = time => {
    onDayChange({
      ...day,
      startTime: time
    })
  }

  const handleEndTimeChange = time => {
    onDayChange({
      ...day,
      endTime: time
    })
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4 py-2 border-b border-gray-200 dark:border-gray-700 last:border-0">
      <div className="flex items-center w-full md:w-1/4">
        <input
          type="checkbox"
          id={`day-${day.id}`}
          checked={day.enabled}
          onChange={handleCheckboxChange}
          className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 dark:text-blue-500 focus:ring-blue-500 dark:focus:ring-blue-400"
        />
        <label
          htmlFor={`day-${day.id}`}
          className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {day.label}
        </label>
      </div>
      <div
        className={`grid grid-cols-2 gap-4 w-full md:w-3/4 ${
          !day.enabled ? "opacity-50" : ""
        }`}
      >
        <SingleTimePicker
          label="From"
          time={day.startTime}
          onTimeChange={handleStartTimeChange}
          error={error?.start}
          className="w-full"
        />
        <SingleTimePicker
          label="To"
          time={day.endTime}
          onTimeChange={handleEndTimeChange}
          error={error?.end}
          className="w-full"
        />
      </div>
    </div>
  )
}

export function DaysTimePicker({ days, onDaysChange, errors = {} }) {
  const [generalStartTime, setGeneralStartTime] = useState("09:00 AM")
  const [generalEndTime, setGeneralEndTime] = useState("05:00 PM")

  const handleDayChange = updatedDay => {
    const updatedDays = days.map(day =>
      day.id === updatedDay.id ? updatedDay : day
    )
    onDaysChange(updatedDays)
  }

  const handleGeneralStartTimeChange = time => {
    setGeneralStartTime(time)
    const updatedDays = days.map(day => ({
      ...day,
      startTime: time
    }))
    onDaysChange(updatedDays)
  }

  const handleGeneralEndTimeChange = time => {
    setGeneralEndTime(time)
    const updatedDays = days.map(day => ({
      ...day,
      endTime: time
    }))
    onDaysChange(updatedDays)
  }

  return (
    <div className="space-y-4">
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Set hours for all days
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <SingleTimePicker
            label="From"
            time={generalStartTime}
            onTimeChange={handleGeneralStartTimeChange}
            className="w-full"
          />
          <SingleTimePicker
            label="To"
            time={generalEndTime}
            onTimeChange={handleGeneralEndTimeChange}
            className="w-full"
          />
        </div>
      </div>

      <div className="space-y-1">
        {days.map(day => (
          <DayTimePicker
            key={day.id}
            day={day}
            onDayChange={handleDayChange}
            error={errors[day.id]}
          />
        ))}
      </div>
    </div>
  )
}
