import type { MetadataRoute } from "next";
import { getGallerySlugs, getGallery } from "@/lib/galleries";
import { assetUrl } from "@/lib/gallery-shared";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.paper34.fr";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/creation-site-web`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/services/reseaux-sociaux`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/services/graphisme`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/marseille`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/applications`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/confidentialite`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/galeries`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    // Galeries publiques (hors `private`) + leurs images pour Google Images
    ...getGallerySlugs()
      .map((slug) => getGallery(slug))
      .filter((g): g is NonNullable<typeof g> => g !== null && !g.private)
      .map((g) => ({
        url: `${baseUrl}/galerie/${g.slug}`,
        lastModified: new Date(g.date),
        changeFrequency: "yearly" as const,
        priority: 0.6,
        images: g.photos
          .filter((p) => p.type !== "video")
          .slice(0, 100)
          .map((p) => assetUrl(g.slug, p.display)),
      })),
  ];
}
