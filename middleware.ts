import { NextResponse } from "next/server";
import configData from "./config";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";


// Define the type for clerkMiddleware
type ClerkMiddleware = (handler: (auth: any, req: any) => any) => (req: any) => Promise<any>;

let clerkMiddleware: ClerkMiddleware | undefined;
let createRouteMatcher: ((routes: string[]) => (req: any) => boolean) | undefined;

const appConfig = { ...configData };

if (appConfig.auth.enabled) {
  try {
    ({ clerkMiddleware, createRouteMatcher } = require("@clerk/nextjs/server"));
  } catch (error) {
    console.warn("Clerk modules not available. Auth will be disabled.");
    appConfig.auth.enabled = false;
  }
}

const isProtectedRoute = appConfig.auth.enabled
  ? createRouteMatcher?.(["/dashboard(.*)"]) ?? (() => false)
  : () => false;

// List of supported locales
const supportedLocales = ["en", "de", "es", "fr", "it", "pt"];

// Create the internationalization middleware using next-intl
const intlMiddleware = createIntlMiddleware({
  locales: supportedLocales,
  defaultLocale: "en",
});

export default async function middleware(req: any) {
  const { pathname } = req.nextUrl;

  // If the path is one of the excluded ones, skip internationalization but proceed with other middleware
  if (
    pathname.startsWith("/studio") ||
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/onboarding")
  ) {
    return NextResponse.next();
  }

  // Run the internationalization middleware for other routes
  const intlResponse = await intlMiddleware(req);

  // If next-intl middleware already handled the response, return it
  if (intlResponse) {
    return intlResponse;
  }

  // Proceed with Clerk authentication if enabled
  if (appConfig.auth.enabled && clerkMiddleware) {
    return clerkMiddleware((auth, req) => {
      if (!auth().userId && isProtectedRoute(req)) {
        return auth().redirectToSignIn();
      } else {
        return NextResponse.next();
      }
    })(req);
  } else {
    return NextResponse.next();
  }
}

// Configuration for matching routes for both next-intl and Clerk middleware
export const middlewareConfig = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    // Add internationalized pathnames for next-intl with supported locales
    "/",
    "/(en|de|es|fr|it|pt)/:path*",
  ],
};




// import { NextResponse } from "next/server";
// import config from "./config";


// let clerkMiddleware: (arg0: (auth: any, req: any) => any) => { (arg0: any): any; new(): any; }, createRouteMatcher;

// if (config.auth.enabled) {
//   try {
//     ({ clerkMiddleware, createRouteMatcher } = require("@clerk/nextjs/server"));
//   } catch (error) {
//     console.warn("Clerk modules not available. Auth will be disabled.");
//     config.auth.enabled = false;
//   }
// }

// const isProtectedRoute = config.auth.enabled
//   ? createRouteMatcher(["/dashboard(.*)"])
//   : () => false;

// export default function middleware(req: any) {
//   if (config.auth.enabled) {
//     return clerkMiddleware((auth, req) => {
//       if (!auth().userId && isProtectedRoute(req)) {
//         return auth().redirectToSignIn();
//       } else {
//         return NextResponse.next();
//       }
//     })(req);
//   } else {
//     return NextResponse.next();
//   }
// }

// export const middlewareConfig = {
//   matcher: [
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     "/(api|trpc)(.*)",
//   ],
// };