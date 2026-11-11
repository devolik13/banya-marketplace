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
  // Цена общая, «от». Программы и расписание гость смотрит на сайте школы.
  price: string | null;
  image: string | null;
  summary: string;
  contacts: Contacts;
  checkedAt: string | null;
  demo: boolean;
} & Promo;

const sample = (n: number): School => ({
  slug: `obrazec-shkoly-${n}`,
  name: "Название школы",
  city: null,
  format: null,
  duration: null,
  price: null,
  image: null,
  summary: "Здесь будет короткое описание школы: чему учат и для кого курс.",
  contacts: noContacts,
  checkedAt: null,
  demo: true,
  ...noPromo,
});

export const schools: School[] = [sample(1), sample(2)];

export const getSchool = (slug: string) => schools.find((s) => s.slug === slug);
