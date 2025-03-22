import { NextResponse } from "next/server";

const locales = ["pl", "en"];
const defaultLocale = "pl";

function getLocale(request) {
  const acceptLanguage = request.headers.get("accept-language");

  if (!acceptLanguage || acceptLanguage.includes("*")) {
    return defaultLocale;
  }

  const languages = acceptLanguage
    .split(",")
    .map((lang) => lang.split(";")[0].trim());

  for (const locale of languages) {
    if (locales.includes(locale)) {
      return locale;
    }
  }

  return defaultLocale;
}

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const isApiRequest = pathname.startsWith("/api");
  const isAsset = pathname.startsWith("/_next") || /\.(.*)$/.test(pathname);

  // Skip redirection for API requests and static assets
  if (isApiRequest || isAsset) return;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;

  console.log(`Redirecting to ${url.pathname}`);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
     * Exclude all API routes and static files (_next, assets, images, etc.)
     */
    "/((?!api|_next|.*\\..*).*)",
    "/",
  ],
};
