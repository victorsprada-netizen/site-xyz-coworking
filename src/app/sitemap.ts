import type { MetadataRoute } from "next";
import { siteData } from "@/data/sites";

export const revalidate = 3600;

// Apenas lê a lista de artigos da API do WordPress (mesma usada no blog)
async function getBlogSlugs(): Promise<{ slug: string; modified?: string }[]> {
  try {
    const res = await fetch(
      "https://xyzcoworking.com/wp-json/wp/v2/posts?per_page=100&_fields=slug,modified",
      { next: { revalidate: 3600 } },
    );

    if (!res.ok) return [];

    const posts = await res.json();

    return Array.isArray(posts) ? posts : [];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteData.siteUrl;

  const pages: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/servicos`, changeFrequency: "weekly", priority: 0.9 },
    ...siteData.services.map((service) => ({
      url: `${baseUrl}/servicos/${service.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    { url: `${baseUrl}/blog`, changeFrequency: "daily", priority: 0.7 },
  ];

  if (siteData.termsAndConditionFileId) {
    pages.push({
      url: `${baseUrl}/termos-e-condicoes-dos-servicos`,
      changeFrequency: "monthly",
      priority: 0.3,
    });
  }

  pages.push({
    url: `${baseUrl}/politica-de-privacidade`,
    changeFrequency: "yearly",
    priority: 0.2,
  });

  const posts = await getBlogSlugs();

  const articles: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.modified ? new Date(post.modified) : undefined,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...pages, ...articles];
}
