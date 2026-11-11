// Школы банщиков. Пока только образцы карточек.
import { noPromo, type Promo } from "@/data/promo";

export type School = {
  slug: string;
  name: string;
  city: string | null;
  duration: string | null;
  price: string | null;
  site: string | null;
  image: string | null;
  summary: string;
  demo: boolean;
} & Promo;

const sample = (n: number): School => ({
  slug: `obrazec-shkoly-${n}`,
  name: "Название школы",
  city: null,
  duration: null,
  price: null,
  site: null,
  image: null,
  summary: "Здесь будет описание программы: чему учат, сколько практики, какой документ выдают.",
  demo: true,
  ...noPromo,
});

export const schools: School[] = [sample(1), sample(2)];

export const getSchool = (slug: string) => schools.find((s) => s.slug === slug);
