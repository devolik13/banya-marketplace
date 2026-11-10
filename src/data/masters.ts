// Анкеты банщиков. Пока здесь только образцы: настоящие анкеты добавляются по одному шаблону.
// Пармастер (он же пармейстер) только парит. Банщик ведёт баню целиком.
export type MasterScope = "parenie" | "polnyy";

export const scopeLabels: Record<MasterScope, string> = {
  parenie: "Только парение",
  polnyy: "Полный спектр банных услуг",
};

export type Master = {
  slug: string;
  name: string;
  role: string;
  scope: MasterScope;
  city: string | null;
  experienceYears: number | null;
  styles: string[];
  pricePerSession: string | null;
  venueSlug: string | null;
  videoUrl: string | null;
  about: string;
  demo: boolean;
};

const sample = (n: number, scope: MasterScope, styles: string[]): Master => ({
  slug: `obrazec-ankety-${n}`,
  name: "Имя Фамилия",
  role: scope === "parenie" ? "Пармастер" : "Банщик",
  scope,
  city: null,
  experienceYears: null,
  styles,
  pricePerSession: null,
  venueSlug: n === 1 ? "bannyy-dvor-ochakovo" : null,
  videoUrl: null,
  about: "Здесь мастер рассказывает о себе: где учился, как парит, с кем работает.",
  demo: true,
});

export const masters: Master[] = [
  sample(1, "parenie", ["Классическое парение", "Парение в четыре руки"]),
  sample(2, "polnyy", ["Классическое парение", "Аромапар"]),
  sample(3, "polnyy", ["Авторские программы", "Травяные купели"]),
];

export const getMaster = (slug: string) => masters.find((m) => m.slug === slug);
