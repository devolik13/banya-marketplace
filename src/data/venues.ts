// Бани на дровах. Запись с demo: true это образец карточки, а не настоящее заведение.
import { type ChecklistGroup, type Contacts, noContacts } from "@/data/common";
import { noPromo, type Promo } from "@/data/promo";

export type VenueTag = "kupel" | "basseyn";

// Что есть в бане. Владелец отмечает пункты, гость видит полный список.
export const amenityGroups: ChecklistGroup[] = [
  {
    title: "Парные",
    items: {
      "po-belomu": "Парная по-белому",
      "po-chernomu": "Парная по-чёрному",
      hammam: "Хаммам",
    },
  },
  {
    title: "Вода",
    items: {
      basseyn: "Бассейн",
      kupel: "Купель",
      chan: "Банный чан",
    },
  },
  {
    title: "Отдых и еда",
    items: {
      kuhnya: "Кухня или ресторан",
      mangal: "Мангал",
      karaoke: "Караоке",
      bilyard: "Бильярд",
    },
  },
  {
    title: "Условия",
    items: {
      parkovka: "Парковка",
      deti: "Можно с детьми",
      kruglosutochno: "Круглосуточно",
    },
  },
];

export type Venue = {
  slug: string;
  name: string;
  city: string;
  district: string | null;
  address: string | null;
  cabins: number | null;
  hours: string | null;
  priceFrom: string | null;
  capacity: string | null;
  minHours: string | null;
  image: string | null;
  gallery: string[];
  summary: string;
  features: string[];
  amenities: string[];
  tags: VenueTag[];
  contacts: Contacts;
  // Дата, когда данные карточки сверяли с сайтом бани.
  checkedAt: string | null;
  demo: boolean;
} & Promo;

export const venueTags: Record<VenueTag, { slug: string; short: string; title: string; lead: string }> = {
  kupel: {
    slug: "s-chanom",
    short: "С чаном или купелью",
    title: "Бани на дровах с чаном или купелью",
    lead: "Заведения, где после парной есть банный чан или купель.",
  },
  basseyn: {
    slug: "s-basseynom",
    short: "С бассейном",
    title: "Бани на дровах с бассейном",
    lead: "Заведения, где в срубе или на территории есть бассейн.",
  },
};

const sample = (n: number, features: string[], amenities: string[], tags: VenueTag[]): Venue => ({
  slug: `obrazec-kartochki-${n}`,
  name: "Название бани",
  city: "Город",
  district: null,
  address: null,
  cabins: null,
  hours: null,
  priceFrom: null,
  capacity: null,
  minHours: null,
  image: null,
  gallery: [],
  summary: "Здесь будет короткое описание: что за баня, для каких компаний, чем отличается.",
  features,
  amenities,
  tags,
  contacts: noContacts,
  checkedAt: null,
  demo: true,
  ...noPromo,
});

export const venues: Venue[] = [
  {
    // Данные взяты с сайта комплекса. Перед запуском их нужно сверить и согласовать с владельцами.
    slug: "bannyy-dvor-ochakovo",
    name: "Банный двор, Очаково",
    city: "Москва",
    district: "Очаково",
    address: "Очаковское шоссе, 40, стр. 3",
    cabins: 11,
    hours: "Круглосуточно",
    priceFrom: "от 6 000 ₽/час",
    capacity: "до 15 человек",
    minHours: "от 3 часов",
    image: null,
    gallery: [],
    summary: "Баня на дровах в отдельных срубах. Сруб снимает одна компания целиком.",
    features: ["Отдельные срубы", "Бассейн", "Купели", "Пармастера", "Кухня"],
    amenities: [
      "po-belomu",
      "po-chernomu",
      "hammam",
      "basseyn",
      "kupel",
      "kuhnya",
      "mangal",
      "karaoke",
      "bilyard",
      "parkovka",
      "deti",
      "kruglosutochno",
    ],
    tags: ["kupel", "basseyn"],
    contacts: { phone: "+7 (495) 795-00-01", telegram: null, site: "https://banniy-dvor.ru/ochakovo" },
    checkedAt: "ноябрь 2026",
    demo: false,
    ...noPromo,
  },
  sample(1, ["Печь на дровах", "Купель"], ["po-belomu", "kupel", "parkovka"], ["kupel"]),
  sample(2, ["Печь на дровах", "Бассейн"], ["po-belomu", "basseyn", "mangal"], ["basseyn"]),
];

export const getVenue = (slug: string) => venues.find((v) => v.slug === slug);
