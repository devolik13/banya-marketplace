// Школы банщиков. Пока только образцы карточек.
import { type Contacts, noContacts } from "@/data/common";
import { noPromo, type Promo } from "@/data/promo";

export type School = {
  slug: string;
  name: string;
  city: string | null;
  // Очно, онлайн или смешанно.
  format: string | null;
  duration: string | null;
  // Сколько в курсе практики в парной.
  practice: string | null;
  price: string | null;
  // Какой документ получает выпускник.
  document: string | null;
  programs: string[];
  image: string | null;
  summary: string;
  contacts: Contacts;
  checkedAt: string | null;
  demo: boolean;
} & Promo;

const sample = (n: number, programs: string[]): School => ({
  slug: `obrazec-shkoly-${n}`,
  name: "Название школы",
  city: null,
  format: null,
  duration: null,
  practice: null,
  price: null,
  document: null,
  programs,
  image: null,
  summary: "Здесь будет описание программы: чему учат, сколько практики, какой документ выдают.",
  contacts: noContacts,
  checkedAt: null,
  demo: true,
  ...noPromo,
});

export const schools: School[] = [
  sample(1, ["Название базового курса", "Название курса для практикующих мастеров"]),
  sample(2, ["Название курса"]),
];

export const getSchool = (slug: string) => schools.find((s) => s.slug === slug);
