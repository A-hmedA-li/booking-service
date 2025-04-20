import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Next.js Skeleton',
  description: 'A minimal Next.js starter template',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background">
        <main className="container mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  )
}
