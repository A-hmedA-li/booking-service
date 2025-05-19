import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import "./globals.css"

export default function RootLayout({ children }) {
  return (
    <html lang="ar" suppressHydrationWarning>
      <head>
        <title>Booking Service</title>
        <meta
          name="description"
          content="Online booking service for businesses"
        />
      </head>
      <body className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
   
        
            {children}
      
      </body>
    </html>
  )
}
