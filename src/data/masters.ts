// Анкеты банщиков. Пока здесь только образцы: настоящие анкеты добавляются по одному шаблону.

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

export type Master = {
  slug: string;
  name: string;
  role: string;
  scope: MasterScope;
  city: string | null;
  experienceYears: number | null;
  services: string[];
  pricePerSession: string | null;
  venueSlug: string | null;
  videoUrl: string | null;
  about: string;
  demo: boolean;
};

const sample = (n: number, scope: MasterScope, services: string[]): Master => ({
  slug: `obrazec-ankety-${n}`,
  name: "Имя Фамилия",
  role: scope === "parenie" ? "Пармастер" : "Банщик",
  scope,
  city: null,
  experienceYears: null,
  services,
  pricePerSession: null,
  venueSlug: n === 1 ? "bannyy-dvor-ochakovo" : null,
  videoUrl: null,
  about: "Здесь мастер рассказывает о себе: где учился, как парит, с кем работает.",
  demo: true,
});

export const masters: Master[] = [
  sample(1, "parenie", ["parenie-klassicheskoe", "parenie-v-4-ruki", "parenie-avtorskoe"]),
  sample(2, "polnyy", ["parenie-klassicheskoe", "aromapar", "pomyvka", "piling", "massazh", "kontrast"]),
  sample(3, "polnyy", ["parenie-klassicheskoe", "parenie-avtorskoe", "pomyvka", "piling", "kupeli"]),
];

export const getMaster = (slug: string) => masters.find((m) => m.slug === slug);
