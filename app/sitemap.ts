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
