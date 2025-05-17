import * as React from "react"

export const Separator = React.forwardRef(
  ({ className, orientation = "horizontal", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`${
          orientation === "horizontal" ? "h-px w-full" : "h-full w-px"
        } bg-gray-200 dark:bg-gray-700 ${className || ""}`}
        {...props}
      />
    )
  }
)
Separator.displayName = "Separator"
