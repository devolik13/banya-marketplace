import type { MetadataRoute } from "next";
import { masters } from "@/data/masters";
import { schools } from "@/data/schools";
import { tubBrands, tubGuides } from "@/data/tubs";
import { venues, venueTags } from "@/data/venues";
import { absoluteUrl } from "@/lib/site";

// Образцы карточек в карту сайта не попадают.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/bani-na-drovah",
    ...Object.values(venueTags).map((t) => `/bani-na-drovah/${t.slug}`),
    ...venues.filter((v) => !v.demo).map((v) => `/bani-na-drovah/${v.slug}`),
    "/banshchiki",
    ...masters.filter((m) => !m.demo).map((m) => `/banshchiki/${m.slug}`),
    "/bannye-chany",
    ...tubGuides.map((g) => `/bannye-chany/${g.slug}`),
    ...tubBrands.map((b) => `/bannye-chany/${b.slug}`),
    "/shkoly-banshchikov",
    ...schools.filter((s) => !s.demo).map((s) => `/shkoly-banshchikov/${s.slug}`),
    "/o-proekte",
    "/dobavit",
  ];
  return paths.map((p) => ({ url: absoluteUrl(p) }));
}
