import type { MetadataRoute } from "next";
import { absoluteUrl, site } from "@/lib/site";

// Тестовая копия закрыта от всех роботов. После запуска открываем сайт поисковикам и роботам ИИ.
export default function robots(): MetadataRoute.Robots {
  if (!site.indexable) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
