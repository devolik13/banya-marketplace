// Поставщики банных товаров: веники, текстиль, шапки, травы, посуда.
// Это каталог компаний, а не магазин: на сайте нет корзины и склада, только карточка и ссылка на поставщика.
import { noPromo, type Promo } from "@/data/promo";

export const goodsCategories = {
  veniki: {
    slug: "veniki",
    name: "Веники",
    title: "Веники для бани: где купить в розницу и оптом",
    lead: "Поставщики банных веников: дубовые, берёзовые, пихтовые и другие. Для себя и для бань, которым нужен опт.",
  },
  tekstil: {
    slug: "tekstil-i-halaty",
    name: "Текстиль и халаты",
    title: "Халаты, простыни и полотенца для бани",
    lead: "Поставщики банного текстиля: халаты, простыни, полотенца, килты.",
  },
  shapki: {
    slug: "shapki-i-rukavitsy",
    name: "Шапки и рукавицы",
    title: "Банные шапки и рукавицы",
    lead: "Поставщики банных шапок, рукавиц и ковриков из войлока и других материалов.",
  },
  travy: {
    slug: "travy-i-masla",
    name: "Травы и масла",
    title: "Травы, запарки и масла для бани",
    lead: "Поставщики травяных сборов, запарок, настоек для парения и эфирных масел.",
  },
  posuda: {
    slug: "posuda-i-aksessuary",
    name: "Посуда и аксессуары",
    title: "Банная посуда и аксессуары",
    lead: "Поставщики ушатов, ковшей, запарников, мочалок и других банных принадлежностей.",
  },
} as const;

export type GoodsCategoryKey = keyof typeof goodsCategories;
export const goodsCategoryList = Object.entries(goodsCategories).map(([key, c]) => ({ key: key as GoodsCategoryKey, ...c }));
export const getGoodsCategory = (slug: string) => goodsCategoryList.find((c) => c.slug === slug);

export type Supplier = {
  slug: string;
  name: string;
  city: string | null;
  site: string | null;
  categories: GoodsCategoryKey[];
  retail: boolean;
  wholesale: boolean;
  delivery: string | null;
  image: string | null;
  summary: string;
  demo: boolean;
} & Promo;

const sample = (n: number, categories: GoodsCategoryKey[], retail: boolean, wholesale: boolean): Supplier => ({
  slug: `obrazec-postavshchika-${n}`,
  name: "Название поставщика",
  city: null,
  site: null,
  categories,
  retail,
  wholesale,
  delivery: null,
  image: null,
  summary: "Здесь будет описание: что продаёт, откуда товар, с какими объёмами работает.",
  demo: true,
  ...noPromo,
});

// Пока здесь только образцы карточек.
export const suppliers: Supplier[] = [
  sample(1, ["veniki", "travy"], true, true),
  sample(2, ["tekstil", "shapki"], false, true),
  sample(3, ["posuda", "shapki", "veniki"], true, false),
];

export const getSupplier = (slug: string) => suppliers.find((s) => s.slug === slug);

export const saleLabel = (s: Pick<Supplier, "retail" | "wholesale">) =>
  s.retail && s.wholesale ? "Розница и опт" : s.wholesale ? "Только опт" : "Только розница";
