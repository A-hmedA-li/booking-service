"use client"
import * as React from "react"
import { createContext, useContext } from "react"

const RadioGroupContext = createContext({})

export const RadioGroup = React.forwardRef(
  ({ className, value, onValueChange, ...props }, ref) => {
    return (
      <RadioGroupContext.Provider value={{ value, onValueChange }}>
        <div ref={ref} className={`space-y-2 ${className || ""}`} {...props} />
      </RadioGroupContext.Provider>
    )
  }
)
RadioGroup.displayName = "RadioGroup"

export const RadioGroupItem = React.forwardRef(
  ({ className, value, id, ...props }, ref) => {
    const context = useContext(RadioGroupContext)

    return (
      <input
        type="radio"
        ref={ref}
        id={id}
        value={value}
        checked={context.value === value}
        onChange={e => {
          if (e.target.checked && context.onValueChange) {
            context.onValueChange(value)
          }
        }}
        className={`h-4 w-4 border-gray-300 dark:border-gray-600 text-blue-600 dark:text-blue-500 focus:ring-blue-500 dark:focus:ring-blue-400 ${className ||
          ""}`}
        {...props}
      />
    )
  }
)
RadioGroupItem.displayName = "RadioGroupItem"
