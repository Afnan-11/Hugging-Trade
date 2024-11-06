import { MetadataRoute } from "next";

const locales = ["en", "de", "es", "fr", "it", "pt"];

const pages = [
  { path: "/" },
  { path: "/pricing" },
  { path: "/affiliate" },
  { path: "/contact-us" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapEntries = pages.flatMap(({ path }) => 
    locales.map((locale) => ({
      url: `https://www.huggingtrade.com/${locale}${path}`,
      lastModified: new Date().toISOString(),
    }))
  );

  return sitemapEntries;
}






// type BlogPost = {
//   slug: string;
//   created_at: string;
// };

// type SitemapEntry = {
//   url: string;
//   lastModified: string;
//   changeFrequency:
//     | "always"
//     | "hourly"
//     | "daily"
//     | "weekly"
//     | "monthly"
//     | "yearly"
//     | "never";
//   priority?: number;
// };

// export default async function sitemap(): Promise<SitemapEntry[]> {
//   const baseUrl = "https://starter.rasmic.xyz";

//   const staticPages: SitemapEntry[] = [
//     {
//       url: baseUrl,
//       lastModified: new Date().toISOString(),
//       changeFrequency: "monthly",
//       priority: 1,
//     },
//     {
//       url: `${baseUrl}/blog`,
//       lastModified: new Date().toISOString(),
//       changeFrequency: "weekly",
//       priority: 0.8,
//     },
//   ];

//   return [...staticPages];
// }
