// Школы банщиков. Пока только образцы карточек.
export type School = {
  slug: string;
  name: string;
  city: string | null;
  duration: string | null;
  price: string | null;
  site: string | null;
  summary: string;
  demo: boolean;
};

const sample = (n: number): School => ({
  slug: `obrazec-shkoly-${n}`,
  name: "Название школы",
  city: null,
  duration: null,
  price: null,
  site: null,
  summary: "Здесь будет описание программы: чему учат, сколько практики, какой документ выдают.",
  demo: true,
});

export const schools: School[] = [sample(1), sample(2)];

export const getSchool = (slug: string) => schools.find((s) => s.slug === slug);
