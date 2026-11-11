// Анкеты банщиков. Пока здесь только образцы: настоящие анкеты добавляются по одному шаблону.
import { type Contacts, noContacts } from "@/data/common";
import { noPromo, type Promo } from "@/data/promo";

// Пармастер (он же пармейстер) только парит. Банщик это собирательное название:
// он и парит, и делает помывки, пилинги, массаж.
// Топить печь и убирать баню обычно не работа ни того, ни другого: этим занят персонал бани.
export type MasterScope = "parenie" | "polnyy";

export const scopeLabels: Record<MasterScope, string> = {
  parenie: "Только парение",
  polnyy: "Полный спектр банных процедур",
};

// Список услуг для анкеты. Мастер отмечает, что именно он делает.
export const serviceGroups = [
  {
    title: "Парение",
    items: {
      "parenie-klassicheskoe": "Классическое парение",
      "parenie-individualnoe": "Индивидуальное парение",
      "parenie-v-4-ruki": "Парение в четыре руки",
      aromapar: "Аромапар",
      "parenie-avtorskoe": "Авторские программы парения",
    },
  },
  {
    title: "Банные процедуры",
    items: {
      pomyvka: "Помывка: веничная, лыковая",
      piling: "Пилинг и скраб",
      massazh: "Массаж",
      kontrast: "Контрастные процедуры и обливания",
      kupeli: "Травяные купели",
    },
  },
] as const;

const allServices = Object.assign({}, ...serviceGroups.map((g) => g.items)) as Record<string, string>;
export const serviceLabel = (key: string) => allServices[key] ?? key;

// Где мастер работает: в бане, где он в штате или на смене, или на выезде в баню гостя.
export type MasterFormat = "v-bane" | "vyezd";

export const formatLabels: Record<MasterFormat, string> = {
  "v-bane": "Работает в бане",
  vyezd: "Выезжает к гостю",
};

export type Master = {
  slug: string;
  name: string;
  role: string;
  scope: MasterScope;
  city: string | null;
  experienceYears: number | null;
  services: string[];
  formats: MasterFormat[];
  // Готов выходить на смены и мероприятия в банные комплексы. Это поле для владельцев бань.
  openToVenues: boolean;
  // Цена указывается общая, «от». Подробности мастер обсуждает с гостем сам.
  priceFrom: string | null;
  // Минимальная сумма заказа, за которую мастер готов выехать.
  minVisit: string | null;
  venueSlug: string | null;
  photo: string | null;
  gallery: string[];
  videoUrl: string | null;
  about: string;
  education: string[];
  achievements: string[];
  contacts: Contacts;
  demo: boolean;
} & Promo;

const sample = (
  n: number,
  scope: MasterScope,
  services: string[],
  formats: MasterFormat[],
  extra: Partial<Master> = {},
): Master => ({
  slug: `obrazec-ankety-${n}`,
  name: "Имя Фамилия",
  role: scope === "parenie" ? "Пармастер" : "Банщик",
  scope,
  city: null,
  experienceYears: null,
  services,
  formats,
  openToVenues: false,
  priceFrom: null,
  minVisit: null,
  venueSlug: null,
  photo: null,
  gallery: [],
  videoUrl: null,
  about: "Здесь мастер рассказывает о себе: где учился, как парит, с кем работает.",
  education: [],
  achievements: [],
  contacts: noContacts,
  demo: true,
  ...noPromo,
  ...extra,
});

// Цены в образцах условные: «0 000 ₽» показывает, где будет стоять настоящая цена.
export const masters: Master[] = [
  sample(1, "parenie", ["parenie-klassicheskoe", "parenie-v-4-ruki", "parenie-avtorskoe"], ["v-bane"], {
    venueSlug: "bannyy-dvor-ochakovo",
  }),
  sample(2, "polnyy", ["parenie-klassicheskoe", "aromapar", "pomyvka", "piling", "massazh", "kontrast"], ["v-bane", "vyezd"], {
    openToVenues: true,
    priceFrom: "от 0 000 ₽",
    minVisit: "от 00 000 ₽",
    education: ["Название школы, год выпуска"],
    achievements: ["Участие в чемпионате или фестивале, год"],
  }),
  sample(3, "polnyy", ["parenie-klassicheskoe", "parenie-avtorskoe", "pomyvka", "piling", "kupeli"], ["vyezd"]),
];

export const getMaster = (slug: string) => masters.find((m) => m.slug === slug);
