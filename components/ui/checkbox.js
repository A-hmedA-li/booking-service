import * as React from "react"

export const Checkbox = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      type="checkbox"
      className={`h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 dark:text-blue-500 focus:ring-blue-500 dark:focus:ring-blue-400 ${className ||
        ""}`}
      ref={ref}
      {...props}
    />
  )
})
Checkbox.displayName = "Checkbox"
