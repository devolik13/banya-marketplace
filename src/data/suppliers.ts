// Поставщики банных товаров: веники, текстиль, шапки, травы, посуда.
// Это каталог компаний, а не магазин: на сайте нет корзины и склада, только карточка и ссылка на поставщика.
import { type Contacts, noContacts } from "@/data/common";
import { noPromo, type Promo } from "@/data/promo";

// Порядок категорий идёт по спросу в поиске: веники, шапки, затем килты и халаты.
// Простыни и полотенца в заголовки не вынесены: для бани подходят любые, и отдельно их почти не ищут.
export const goodsCategories = {
  veniki: {
    slug: "veniki",
    image: "/illustrations/venik-dubovyy.webp",
    name: "Веники",
    title: "Веники для бани: где купить в розницу и оптом",
    lead: "Поставщики банных веников: дубовые, берёзовые, пихтовые и ароматные из трав. Для себя и для бань, которым нужен опт.",
    // Гид со слов практика. Все виды веников описаны на одной странице, отдельных страниц под каждый вид пока нет.
    guide: {
      title: "Какие веники берут для бани",
      paragraphs: [
        "На парение компании от одного до трёх человек обычно уходит два веника, дубовых или берёзовых.",
      ],
      sections: [
        { title: "Дубовый веник", image: "/illustrations/venik-dubovyy.webp", text: "Самый ходовой: дубовыми вениками парят чаще всего." },
        {
          title: "Берёзовый веник", image: "/illustrations/venik-berezovyy.webp",
          text: "На втором месте после дубового. Берёзовым веником иногда накрывают голову.",
        },
        {
          title: "Пихтовый веник", image: "/illustrations/venik-pihtovyy.webp",
          text: "Нужен для аромата, берут его нечасто. Если берут, то пихтовыми вениками выстилают полок для парения, и на это уходит в среднем от 12 до 20 штук за раз.",
        },
        {
          title: "Ароматные веники из трав", image: "/illustrations/venik-travy.webp",
          text: "Отдельная группа: полынь, донник, мята и другие травы. Ими не парят: их берут ради запаха и заваривают в купели.",
        },
      ],
    },
  },
  shapki: {
    slug: "shapki-i-rukavitsy",
    image: "/illustrations/shapka.webp",
    name: "Шапки и рукавицы",
    title: "Шапки для бани и рукавицы",
    lead: "Поставщики банных шапок, войлочных и шерстяных, а также рукавиц и ковриков.",
    // Короткий гид со слов практика. Показывается на странице категории.
    guide: {
      title: "Войлочная или шерстяная",
      paragraphs: [
        "Банная шапка изнашивается быстрее, чем килт или халат, поэтому покупают шапки чаще.",
        "Войлочные шапки недорогие и служат недолго. В некоторых банях их выдают гостям как одноразовые.",
        "Шерстяные шапки дороже, но личная шапка может служить годами.",
      ],
    },
  },
  tekstil: {
    slug: "kilty-i-halaty",
    image: "/illustrations/kilt.webp",
    name: "Килты и халаты",
    title: "Килты и халаты для бани",
    lead: "Поставщики банных килтов, халатов и другого текстиля. Простыни и полотенца бани обычно закупают оптом у производителей текстиля, такие поставщики отмечены пометкой «опт».",
  },
  travy: {
    slug: "travy-i-masla",
    image: "/illustrations/travy-i-masla.webp",
    name: "Травы и масла",
    title: "Травы, запарки и масла для бани",
    lead: "Поставщики травяных сборов, запарок, настоек для парения и эфирных масел.",
  },
  posuda: {
    slug: "posuda-i-aksessuary",
    image: "/illustrations/ushat.webp",
    name: "Посуда и аксессуары",
    title: "Банная посуда и аксессуары",
    lead: "Поставщики ушатов, ковшей, запарников, мочалок и других банных принадлежностей.",
  },
} as const;

export type GoodsCategoryKey = keyof typeof goodsCategories;
export type GoodsGuide = {
  title: string;
  paragraphs: readonly string[];
  sections?: readonly { title: string; text: string; image?: string }[];
};
export type GoodsCategory = {
  key: GoodsCategoryKey;
  slug: string;
  image: string;
  name: string;
  title: string;
  lead: string;
  guide?: GoodsGuide;
};
export const goodsCategoryList: GoodsCategory[] = Object.entries(goodsCategories).map(([key, c]) => ({
  key: key as GoodsCategoryKey,
  ...c,
}));
export const getGoodsCategory = (slug: string) => goodsCategoryList.find((c) => c.slug === slug);

export type Supplier = {
  slug: string;
  name: string;
  city: string | null;
  categories: GoodsCategoryKey[];
  retail: boolean;
  wholesale: boolean;
  // Минимальная партия для опта.
  minOrder: string | null;
  delivery: string | null;
  image: string | null;
  summary: string;
  contacts: Contacts;
  checkedAt: string | null;
  demo: boolean;
} & Promo;

const sample = (n: number, categories: GoodsCategoryKey[], retail: boolean, wholesale: boolean): Supplier => ({
  slug: `obrazec-postavshchika-${n}`,
  name: "Название поставщика",
  city: null,
  categories,
  retail,
  wholesale,
  minOrder: null,
  delivery: null,
  image: null,
  summary: "Здесь будет описание: что продаёт, откуда товар, с какими объёмами работает.",
  contacts: noContacts,
  checkedAt: null,
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
