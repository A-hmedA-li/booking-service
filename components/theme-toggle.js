"use client"

import { useTheme } from "@/components/theme-provider"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
      aria-label={
        theme === "light" ? "Switch to dark theme" : "Switch to light theme"
      }
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 text-gray-700" />
      ) : (
        <Sun className="h-5 w-5 text-yellow-300" />
      )}
    </button>
  )
}
