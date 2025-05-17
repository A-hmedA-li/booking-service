import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import "./globals.css"

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Booking Service</title>
        <meta
          name="description"
          content="Online booking service for businesses"
        />
      </head>
      <body className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <ThemeProvider defaultTheme="light">
          <header className="border-b border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <h1 className="text-xl font-bold">Booking Service</h1>
              <ThemeToggle />
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
