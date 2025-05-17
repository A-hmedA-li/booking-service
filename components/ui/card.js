import * as React from "react"

export const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm ${className ||
      ""}`}
    {...props}
  />
))
Card.displayName = "Card"

export const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`p-6 border-b border-gray-200 dark:border-gray-700 ${className ||
      ""}`}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

export const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={`text-xl font-semibold text-gray-900 dark:text-gray-100 ${className ||
      ""}`}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

export const CardDescription = React.forwardRef(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={`text-sm text-gray-500 dark:text-gray-400 mt-1 ${className ||
        ""}`}
      {...props}
    />
  )
)
CardDescription.displayName = "CardDescription"

export const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`p-6 ${className || ""}`} {...props} />
))
CardContent.displayName = "CardContent"

export const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`p-6 border-t border-gray-200 dark:border-gray-700 ${className ||
      ""}`}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"
