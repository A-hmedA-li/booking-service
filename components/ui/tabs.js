"use client"
import * as React from "react"
import { createContext, useContext, useState } from "react"

const TabsContext = createContext({})

export const Tabs = React.forwardRef(
  (
    { className, value, defaultValue, onValueChange, children, ...props },
    ref
  ) => {
    const [tabValue, setTabValue] = useState(value || defaultValue || "")

    const handleValueChange = newValue => {
      setTabValue(newValue)
      onValueChange?.(newValue)
    }

    return (
      <TabsContext.Provider
        value={{ value: value || tabValue, onValueChange: handleValueChange }}
      >
        <div ref={ref} className={`${className || ""}`} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    )
  }
)
Tabs.displayName = "Tabs"

export const TabsList = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`flex border-b border-gray-200 dark:border-gray-700 ${className ||
        ""}`}
      {...props}
    />
  )
})
TabsList.displayName = "TabsList"

export const TabsTrigger = React.forwardRef(
  ({ className, value, ...props }, ref) => {
    const context = useContext(TabsContext)
    const isActive = context.value === value

    return (
      <button
        ref={ref}
        type="button"
        data-value={value}
        data-state={isActive ? "active" : "inactive"}
        onClick={() => context.onValueChange?.(value)}
        className={`py-2 px-4 text-sm font-medium border-b-2 ${
          isActive
            ? "border-blue-500 text-blue-600 dark:text-blue-400"
            : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
        } ${className || ""}`}
        {...props}
      />
    )
  }
)
TabsTrigger.displayName = "TabsTrigger"

export const TabsContent = React.forwardRef(
  ({ className, value, ...props }, ref) => {
    const context = useContext(TabsContext)
    const isActive = context.value === value

    if (!isActive) return null

    return (
      <div
        ref={ref}
        data-state={isActive ? "active" : "inactive"}
        className={`mt-2 ${className || ""}`}
        {...props}
      />
    )
  }
)
TabsContent.displayName = "TabsContent"
