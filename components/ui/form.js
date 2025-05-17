"use client"

import * as React from "react"
import { createContext, useContext, useId } from "react"

const FormContext = createContext({ id: "" })

export function useFormField() {
  const fieldContext = useContext(FormContext)
  const itemContext = useContext(FormItemContext)

  const id = itemContext?.id || fieldContext.id

  return {
    id,
    name: itemContext?.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`
  }
}

const FormItemContext = createContext({ id: "" })

export const Form = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <form ref={ref} className={`space-y-6 ${className || ""}`} {...props} />
  )
})
Form.displayName = "Form"

export const FormField = React.forwardRef(
  ({ render, name, control, ...props }, ref) => {
    const id = useId()

    // This is a simplified version without actual form control integration
    const field = {
      name,
      value: "",
      onChange: () => {},
      onBlur: () => {},
      ref: null
    }

    return (
      <FormContext.Provider value={{ id }}>
        <div ref={ref} {...props}>
          {render({ field })}
        </div>
      </FormContext.Provider>
    )
  }
)
FormField.displayName = "FormField"

export const FormItem = React.forwardRef(
  ({ className, name, ...props }, ref) => {
    const id = useId()

    return (
      <FormItemContext.Provider value={{ id, name }}>
        <div ref={ref} className={`space-y-2 ${className || ""}`} {...props} />
      </FormItemContext.Provider>
    )
  }
)
FormItem.displayName = "FormItem"

export const FormLabel = React.forwardRef(({ className, ...props }, ref) => {
  const { id } = useFormField()

  return (
    <label
      ref={ref}
      htmlFor={id}
      className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${className ||
        ""}`}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

export const FormControl = React.forwardRef(({ ...props }, ref) => {
  const { id } = useFormField()

  return <div ref={ref} id={id} {...props} />
})
FormControl.displayName = "FormControl"

export const FormDescription = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField()

    return (
      <p
        ref={ref}
        id={formDescriptionId}
        className={`text-sm text-gray-500 dark:text-gray-400 ${className ||
          ""}`}
        {...props}
      />
    )
  }
)
FormDescription.displayName = "FormDescription"

export const FormMessage = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const { formMessageId } = useFormField()

    return (
      <p
        ref={ref}
        id={formMessageId}
        className={`text-sm font-medium text-red-500 dark:text-red-400 ${className ||
          ""}`}
        {...props}
      >
        {children}
      </p>
    )
  }
)
FormMessage.displayName = "FormMessage"
