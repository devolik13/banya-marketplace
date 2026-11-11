// Общие настройки сайта. Название меняется здесь, в одном месте.
export const site = {
  name: "Банная площадка",
  shortDescription: "Бани на дровах, банщики, банные чаны и школы банного мастерства",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://banya-platform.vercel.app",
  // Пока сайт тестовый, поисковикам он закрыт. Перед запуском задать NEXT_PUBLIC_SITE_INDEXABLE=true.
  indexable: process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true",
  // Фото для первого экрана главной. Пока его нет, экран оформлен без картинки.
  heroImage: null as string | null,
};

export const nav = [
  { href: "/bani-na-drovah", label: "Бани на дровах" },
  { href: "/banshchiki", label: "Банщики" },
  { href: "/bannye-chany", label: "Банные чаны" },
  { href: "/shkoly-banshchikov", label: "Школы" },
];

export const absoluteUrl = (path = "/") => new URL(path, site.url).toString();
