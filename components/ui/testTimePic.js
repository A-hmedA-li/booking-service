"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

export function CircularTimePicker({ label, time, onTimeChange, className = "", error }) {
  const [hour, setHour] = useState(9);
  const [minute, setMinute] = useState(0);
  const [period, setPeriod] = useState("AM");
  const [isSelectingMinutes, setIsSelectingMinutes] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const clockRef = useRef(null);

  useEffect(() => {
    if (time) {
      const [timeStr, periodStr] = time.split(" ");
      const [hourStr, minuteStr] = timeStr.split(":");
      setHour(parseInt(hourStr));
      setMinute(parseInt(minuteStr));
      setPeriod(periodStr);
    }
  }, [time]);

  useEffect(() => {
    const formattedHour = hour.toString().padStart(2, "0");
    const formattedMinute = minute.toString().padStart(2, "0");
    const formattedTime = `${formattedHour}:${formattedMinute} ${period}`;
    if (formattedTime !== time) {
      onTimeChange(formattedTime);
    }
  }, [hour, minute, period, onTimeChange, time]);

  const getAngleFromPosition = (centerX, centerY, x, y) => {
    const angle = Math.atan2(y - centerY, x - centerX);
    const degrees = (angle * 180) / Math.PI + 90;
    return degrees < 0 ? degrees + 360 : degrees;
  };

  const handleClockClick = (event) => {
    if (!clockRef.current) return;

    const rect = clockRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const angle = getAngleFromPosition(centerX, centerY, x, y);

    if (isSelectingMinutes) {
      const selectedMinute = Math.round(angle / 6) % 60;
      const roundedMinute = Math.round(selectedMinute / 15) * 15;
      setMinute(roundedMinute === 60 ? 0 : roundedMinute);
    } else {
      const selectedHour = Math.round(angle / 30);
      setHour(selectedHour === 0 ? 12 : selectedHour);
    }
  };

  const getHourPosition = (hourValue) => {
    const angle = (hourValue % 12) * 30 - 90;
    const radius = 80;
    const x = Math.cos((angle * Math.PI) / 180) * radius + 100;
    const y = Math.sin((angle * Math.PI) / 180) * radius + 100;
    return { x, y };
  };

  const getMinutePosition = (minuteValue) => {
    const angle = minuteValue * 6 - 90;
    const radius = 80;
    const x = Math.cos((angle * Math.PI) / 180) * radius + 100;
    const y = Math.sin((angle * Math.PI) / 180) * radius + 100;
    return { x, y };
  };

  const formatDisplayTime = () => {
    const formattedHour = hour.toString().padStart(2, "0");
    const formattedMinute = minute.toString().padStart(2, "0");
    return `${formattedHour}:${formattedMinute} ${period}`;
  };

  return (
    <div className={`relative ${className}`}>
      {label && <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</span>}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 justify-between items-center"
      >
        <span>{formatDisplayTime()}</span>
        <svg
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50 p-4">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setIsSelectingMinutes(false)}
                className={`px-3 py-1 rounded text-sm font-medium ${
                  !isSelectingMinutes
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                Hours
              </button>
              <button
                type="button"
                onClick={() => setIsSelectingMinutes(true)}
                className={`px-3 py-1 rounded text-sm font-medium ${
                  isSelectingMinutes
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                Minutes
              </button>
            </div>

            <div className="relative">
              <svg ref={clockRef} width="200" height="200" className="cursor-pointer" onClick={handleClockClick}>
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-gray-300 dark:text-gray-600"
                />

                {isSelectingMinutes
                  ? [0, 15, 30, 45].map((min) => {
                      const pos = getMinutePosition(min);
                      return (
                        <g key={min}>
                          <circle
                            cx={pos.x}
                            cy={pos.y}
                            r="4"
                            fill="currentColor"
                            className="text-gray-400 dark:text-gray-500"
                          />
                          <text
                            x={pos.x}
                            y={pos.y + 20}
                            textAnchor="middle"
                            className="text-xs fill-current text-gray-600 dark:text-gray-400"
                          >
                            {min.toString().padStart(2, "0")}
                          </text>
                        </g>
                      );
                    })
                  : Array.from({ length: 12 }, (_, i) => {
                      const hourValue = i + 1;
                      const pos = getHourPosition(hourValue);
                      return (
                        <g key={hourValue}>
                          <circle
                            cx={pos.x}
                            cy={pos.y}
                            r="4"
                            fill="currentColor"
                            className="text-gray-400 dark:text-gray-500"
                          />
                          <text
                            x={pos.x}
                            y={pos.y + 20}
                            textAnchor="middle"
                            className="text-xs fill-current text-gray-600 dark:text-gray-400"
                          >
                            {hourValue}
                          </text>
                        </g>
                      );
                    })}

                {isSelectingMinutes
                  ? (() => {
                      const pos = getMinutePosition(minute);
                      return (
                        <g>
                          <line
                            x1="100"
                            y1="100"
                            x2={pos.x}
                            y2={pos.y}
                            stroke="currentColor"
                            strokeWidth="3"
                            className="text-blue-600"
                          />
                          <circle cx={pos.x} cy={pos.y} r="6" fill="currentColor" className="text-blue-600" />
                        </g>
                      );
                    })()
                  : (() => {
                      const pos = getHourPosition(hour);
                      return (
                        <g>
                          <line
                            x1="100"
                            y1="100"
                            x2={pos.x}
                            y2={pos.y}
                            stroke="currentColor"
                            strokeWidth="3"
                            className="text-blue-600"
                          />
                          <circle cx={pos.x} cy={pos.y} r="6" fill="currentColor" className="text-blue-600" />
                        </g>
                      );
                    })()}

                <circle cx="100" cy="100" r="4" fill="currentColor" className="text-blue-600" />
              </svg>
            </div>

            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setPeriod("AM")}
                className={`px-4 py-2 rounded text-sm font-medium ${
                  period === "AM"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                AM
              </button>
              <button
                type="button"
                onClick={() => setPeriod("PM")}
                className={`px-4 py-2 rounded text-sm font-medium ${
                  period === "PM"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                PM
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm font-medium"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {error && <p className="mt-1 text-sm font-medium text-red-500 dark:text-red-400">{error}</p>}
    </div>
  );
}

export function SingleTimePicker({ label, time, onTimeChange, className = "", error }) {
  const [useCircularPicker, setUseCircularPicker] = useState(false);
  const [hour, setHour] = useState("09");
  const [minute, setMinute] = useState("00");
  const [period, setPeriod] = useState("AM");

  const hours = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 1;
    return hour < 10 ? `0${hour}` : `${hour}`;
  });

  const minutes = ["00", "15", "30", "45"];

  useEffect(() => {
    if (time) {
      const [timeStr, periodStr] = time.split(" ");
      const [hourStr, minuteStr] = timeStr.split(":");
      setHour(hourStr);
      setMinute(minuteStr);
      setPeriod(periodStr);
    }
  }, [time]);

  useEffect(() => {
    if (!useCircularPicker) {
      const formattedTime = `${hour}:${minute} ${period}`;
      if (formattedTime !== time) {
        onTimeChange(formattedTime);
      }
    }
  }, [hour, minute, period, onTimeChange, time, useCircularPicker]);

  const selectClasses =
    "flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400";

  if (useCircularPicker) {
    return (
      <div className={className}>
        <div className="flex items-center justify-between mb-2">
          {label && <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>}
          <button
            type="button"
            onClick={() => setUseCircularPicker(false)}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            Use dropdown
          </button>
        </div>
        <CircularTimePicker time={time} onTimeChange={onTimeChange} error={error} />
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-2">
        {label && <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>}
        <button
          type="button"
          onClick={() => setUseCircularPicker(true)}
          className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1"
        >
          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12,6 12,12 16,14"></polyline>
          </svg>
          <span>Clock picker</span>
        </button>
      </div>
      <div className="flex items-center space-x-2">
        <select value={hour} onChange={(e) => setHour(e.target.value)} className={selectClasses} aria-label="Hour">
          {hours.map((h) => (
            <option key={`hour-${h}`} value={h}>
              {h}
            </option>
          ))}
        </select>
        <span className="text-xl dark:text-gray-300">:</span>
        <select
          value={minute}
          onChange={(e) => setMinute(e.target.value)}
          className={selectClasses}
          aria-label="Minute"
        >
          {minutes.map((m) => (
            <option key={`minute-${m}`} value={m}>
              {m}
            </option>
          ))}
        </select>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className={selectClasses}
          aria-label="AM/PM"
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
      {error && <p className="mt-1 text-sm font-medium text-red-500 dark:text-red-400">{error}</p>}
    </div>
  );
}

export function DayTimePicker({ day, onDayChange, error }) {
  const t = useTranslations("form");

  const handleCheckboxChange = (e) => {
    onDayChange({
      ...day,
      enabled: e.target.checked,
    });
  };

  const handleStartTimeChange = (time) => {
    onDayChange({
      ...day,
      startTime: time,
    });
  };

  const handleEndTimeChange = (time) => {
    onDayChange({
      ...day,
      endTime: time,
    });
  };

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
        <label htmlFor={`day-${day.id}`} className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {day.label}
        </label>
      </div>
      <div className={`grid grid-cols-2 gap-4 w-full md:w-3/4 ${!day.enabled ? "opacity-50" : ""}`}>
        <SingleTimePicker
          label={t("availability.from")}
          time={day.startTime}
          onTimeChange={handleStartTimeChange}
          error={error?.start}
          className="w-full"
        />
        <SingleTimePicker
          label={t("availability.to")}
          time={day.endTime}
          onTimeChange={handleEndTimeChange}
          error={error?.end}
          className="w-full"
        />
      </div>
    </div>
  );
}
            
export function DaysTimePicker({ days, onDaysChange, errors = {} }) {
  const t = useTranslations("form");
  const [generalStartTime, setGeneralStartTime] = useState("09:00 AM");
  const [generalEndTime, setGeneralEndTime] = useState("05:00 PM");

  const handleDayChange = (updatedDay) => {
    const updatedDays = days.map((day) => (day.id === updatedDay.id ? updatedDay : day));
    onDaysChange(updatedDays);
  };

  const handleGeneralStartTimeChange = (time) => {
    setGeneralStartTime(time);
    const updatedDays = days.map((day) => ({
      ...day,
      startTime: time,
    }));
    onDaysChange(updatedDays);
  };

  const handleGeneralEndTimeChange = (time) => {
    setGeneralEndTime(time);
    const updatedDays = days.map((day) => ({
      ...day,
      endTime: time,
    }));
    onDaysChange(updatedDays);
  };

  return (
    <div className="space-y-4">
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">{t("availability.generalHours")}</h4>
        <div className="grid grid-cols-2 gap-4">
          <SingleTimePicker
            label={t("availability.from")}
            time={generalStartTime}
            onTimeChange={handleGeneralStartTimeChange}
            className="w-full"
          />
          <SingleTimePicker
            label={t("availability.to")}
            time={generalEndTime}
            onTimeChange={handleGeneralEndTimeChange}
            className="w-full"
          />
        </div>
      </div>

      <div className="space-y-1">
        {days.map((day) => (
          <DayTimePicker key={day.id} day={day} onDayChange={handleDayChange} error={errors[day.id]} />
        ))}
      </div>
    </div>
  );
}