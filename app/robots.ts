import {MetadataRoute} from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/studio/", "/admin/"],
    },
    sitemap: "https://www.huggingtrade.com/sitemap.xml",
  };
}
