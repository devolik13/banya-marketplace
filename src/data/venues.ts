// Бани на дровах. Запись с demo: true это образец карточки, а не настоящее заведение.
export type VenueTag = "kupel" | "basseyn";

export type Venue = {
  slug: string;
  name: string;
  city: string;
  address: string | null;
  site: string | null;
  cabins: number | null;
  hours: string | null;
  summary: string;
  features: string[];
  tags: VenueTag[];
  demo: boolean;
};

export const venueTags: Record<VenueTag, { slug: string; title: string; lead: string }> = {
  kupel: {
    slug: "s-chanom",
    title: "Бани на дровах с чаном или купелью",
    lead: "Заведения, где после парной есть банный чан или купель.",
  },
  basseyn: {
    slug: "s-basseynom",
    title: "Бани на дровах с бассейном",
    lead: "Заведения, где в срубе или на территории есть бассейн.",
  },
};

export const venues: Venue[] = [
  {
    slug: "bannyy-dvor-ochakovo",
    name: "Банный двор, Очаково",
    city: "Москва",
    address: "Очаковское шоссе, 40, стр. 3",
    site: "https://banniy-dvor.ru/ochakovo",
    cabins: 11,
    hours: "Круглосуточно",
    summary: "Баня на дровах в отдельных срубах. Сруб снимает одна компания целиком.",
    features: ["Отдельные срубы", "Бассейн", "Купели", "Пармастера", "Кухня"],
    tags: ["kupel", "basseyn"],
    demo: false,
  },
  {
    slug: "obrazec-kartochki-1",
    name: "Название бани",
    city: "Город",
    address: null,
    site: null,
    cabins: null,
    hours: null,
    summary: "Здесь будет короткое описание: что за баня, для каких компаний, чем отличается.",
    features: ["Печь на дровах", "Купель"],
    tags: ["kupel"],
    demo: true,
  },
  {
    slug: "obrazec-kartochki-2",
    name: "Название бани",
    city: "Город",
    address: null,
    site: null,
    cabins: null,
    hours: null,
    summary: "Здесь будет короткое описание: что за баня, для каких компаний, чем отличается.",
    features: ["Печь на дровах", "Бассейн"],
    tags: ["basseyn"],
    demo: true,
  },
];

export const getVenue = (slug: string) => venues.find((v) => v.slug === slug);
