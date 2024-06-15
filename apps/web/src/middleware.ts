import createMiddleware from "next-intl/middleware";
import { locales } from "@/locales";

export default createMiddleware({
  locales,
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export const config = {
  // matcher: [
  //   /*
  //    * Match all request paths except for the ones starting with:
  //    * - api (API routes)
  //    * - _next/static (static files)
  //    * - _next/image (image optimization files)
  //    * - favicon.ico (favicon file)
  //    */
  //   "/((?!api|_next/static|_next/image|favicon.ico).*)",
  // ],
  // matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - _vercel (Vercel files)
     * - favicon.ico (favicon file)
     * - public directory files (match any file extension)
     */
    "/((?!api|_next/static|_next/image|_vercel|favicon.ico|.*\\..*).*)",
  ],
};
