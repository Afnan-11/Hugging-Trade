import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `https://www.huggingtrade.com/`,
      lastModified: new Date().toISOString(),
    },
    {
      url: "https://www.huggingtrade.com/pricing",
      lastModified: new Date().toISOString(),
    },
    {
      url: "https://www.huggingtrade.com/affiliate",
      lastModified: new Date().toISOString(),
    },
    {
      url: "https://www.huggingtrade.com/contact-us",
      lastModified: new Date().toISOString(),
    },
  ];
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
