import { MetadataRoute } from "next";

const locales = ["en", "de", "es", "fr", "it", "pt"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/dashboard/",
        "/studio/",
        "/admin/",
        "/onboarding/",
        "/api/",
        "/success/",
        "/cancel/",
        "/actions/",
        "/terms-conditions/",
        "/privacy-policy/",
      ],
    },
    sitemap: locales.map((locale) => `https://www.huggingtrade.com/${locale}/sitemap.xml`),
  };
}
