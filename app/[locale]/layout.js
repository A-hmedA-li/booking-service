import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"
import { NextIntlClientProvider } from "next-intl"
import { notFound } from "next/navigation"
import "../globals.css"

// Can be imported from a shared config
const locales = ["en", "ar"]

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export default async function RootLayout({ children, params }) {
  // Validate that the incoming `locale` parameter is valid
  
  let {locale} = await params; 
  
  if (!locales.includes(locale)) notFound()

  let messages
  try {
    messages = (await import(`../../messages/${locale}.json`)).default
  } catch (error) {
    notFound()
  }

  const isRtl = locale === "ar"

  return (
  
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider defaultTheme="light">
           
              {children}
          </ThemeProvider>
        </NextIntlClientProvider>
   
  )
}
