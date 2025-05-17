// This is a simplified version of the toast component
import { toast as sonnerToast } from "sonner"

export const toast = ({ title, description, variant }) => {
  if (variant === "destructive") {
    return sonnerToast.error(title, {
      description
    })
  }

  return sonnerToast(title, {
    description
  })
}
