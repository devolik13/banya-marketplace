// Анкеты банщиков. Пока здесь только образцы: настоящие анкеты добавляются по одному шаблону.
export type Master = {
  slug: string;
  name: string;
  role: string;
  city: string | null;
  experienceYears: number | null;
  styles: string[];
  pricePerSession: string | null;
  venueSlug: string | null;
  videoUrl: string | null;
  about: string;
  demo: boolean;
};

const sample = (n: number, role: string, styles: string[]): Master => ({
  slug: `obrazec-ankety-${n}`,
  name: "Имя Фамилия",
  role,
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
  sample(1, "Пармастер", ["Классическое парение", "Парение в четыре руки"]),
  sample(2, "Банщик", ["Классическое парение", "Аромапар"]),
  sample(3, "Пармастер", ["Авторские программы", "Травяные купели"]),
];

export const getMaster = (slug: string) => masters.find((m) => m.slug === slug);
