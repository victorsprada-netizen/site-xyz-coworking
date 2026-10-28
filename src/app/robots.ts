import type { MetadataRoute } from "next";
import { siteData } from "@/data/sites";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    host: siteData.siteUrl,
    sitemap: `${siteData.siteUrl}/sitemap.xml`,
  };
}
