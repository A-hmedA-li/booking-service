import createMiddleware from "next-intl/middleware"

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "ar"],

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: "en"

  // Domains can also be used to determine the locale
  // domains: [
  //   {
  //     domain: 'example.com',
  //     defaultLocale: 'en'
  //   },
  //   {
  //     domain: 'example.ae',
  //     defaultLocale: 'ar'
  //   }
  // ]
})

export const config = {
  // Skip all paths that should not be internationalized. This example skips
  // certain folders and all pathnames with a dot (e.g. favicon.ico)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"]
}
