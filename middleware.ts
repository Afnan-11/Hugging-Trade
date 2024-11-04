import {NextResponse} from "next/server";
import configData from "./config";
import createIntlMiddleware from "next-intl/middleware";
import {routing} from "./i18n/routing";

// Define the type for clerkMiddleware
type ClerkMiddleware = (handler: (auth: any, req: any) => any) => (req: any) => Promise<any>;

let clerkMiddleware: ClerkMiddleware | undefined;
let createRouteMatcher: ((routes: string[]) => (req: any) => boolean) | undefined;

const appConfig = {...configData};

if (appConfig.auth.enabled) {
  try {
    ({clerkMiddleware, createRouteMatcher} = require("@clerk/nextjs/server"));
  } catch (error) {
    console.warn("Clerk modules not available. Auth will be disabled.");
    appConfig.auth.enabled = false;
  }
}

// Set up route protection for Clerk-authenticated routes
const isProtectedRoute = appConfig.auth.enabled
  ? (createRouteMatcher?.(["/dashboard", "/onboarding"]) ?? (() => false))
  : () => false;

// Supported locales for internationalization
const supportedLocales = ["en", "de", "es", "fr", "it", "pt"];
const intlMiddleware = createIntlMiddleware({
  locales: supportedLocales,
  defaultLocale: "en",
});

export default async function middleware(req: any) {
  const {pathname} = req.nextUrl;

  // Paths to exclude from internationalization but still proceed with other middleware
  const excludedPaths = ["/studio", "/sign-in", "/sign-up", "/dashboard", "/onboarding", "/admin", "/api"];
  const isExcludedPath = excludedPaths.some((path) => pathname.startsWith(path));

  // Run internationalization middleware for non-excluded routes
  if (!isExcludedPath) {
    const intlResponse = await intlMiddleware(req);

    // Return the response if internationalization handled it
    if (intlResponse) {
      return intlResponse;
    }
  }

  // Proceed with Clerk authentication for protected routes
  if (appConfig.auth.enabled && clerkMiddleware) {
    return clerkMiddleware((auth, req) => {
      if (!auth().userId && isProtectedRoute(req)) {
        return auth().redirectToSignIn();
      }
      return NextResponse.next();
    })(req);
  }

  // Allow the request to proceed for non-protected routes
  return NextResponse.next();
}

// Middleware matcher configuration
export const config = {
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
