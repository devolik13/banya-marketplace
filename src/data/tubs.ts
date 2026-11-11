// Производители банных чанов. Названия взяты из поисковых запросов, по которым люди ищут чаны.
// Факты о каждом (город, цены, сайт) не заполнены: их нужно внести с сайтов производителей.
import { noPromo, type Promo } from "@/data/promo";

export type TubBrand = {
  slug: string;
  name: string;
  region: string | null;
  site: string | null;
  priceFrom: string | null;
  image: string | null;
  summary: string | null;
} & Promo;

const brand = (slug: string, name: string): TubBrand => ({
  slug,
  name,
  region: null,
  site: null,
  priceFrom: null,
  image: null,
  summary: null,
  ...noPromo,
});

export const tubBrands: TubBrand[] = [
  brand("sibirskiy-bannyy-chan", "Сибирский банный чан"),
  brand("stolichnyy-bannyy-chan", "Столичный банный чан"),
  brand("chelyabinskie-bannye-chany", "Челябинские банные чаны"),
  brand("kellek", "Kellek"),
  brand("dzheki-chan", "Джеки Чан"),
  brand("dada", "DaDa"),
  brand("izhchan", "ИжЧан"),
  brand("uralskie-bannye-chany", "Уральские банные чаны"),
];

export const getTubBrand = (slug: string) => tubBrands.find((b) => b.slug === slug);

// Статьи раздела. Каждая отвечает на свою группу запросов.
export const tubGuides = [
  {
    slug: "kak-vybrat",
    image: "/illustrations/chany-vybor.webp",
    title: "Как выбрать банный чан",
    lead: "Сравнение материалов, размеров и способов нагрева. Что важно в работе, а не в рекламе.",
    outline: [
      "Чем банный чан отличается от купели",
      "Материал: нержавеющая сталь, чёрный металл, композит, дерево",
      "Размер: на 2, 4, 6 и 8 человек",
      "Нагрев: печь под чаном, боковая печь, выносная печь",
      "Что проверить перед покупкой",
      "Плюсы и минусы, о которых не пишут производители",
    ],
  },
  {
    slug: "svoimi-rukami",
    image: "/illustrations/svoimi-rukami.webp",
    title: "Банный чан своими руками",
    lead: "Что нужно для самостоятельной сборки и во что она обходится по сравнению с готовым чаном.",
    outline: [
      "Из чего делают самодельные чаны",
      "Чертежи и размеры",
      "Комплект для самостоятельной сборки",
      "Площадка и основание под чан",
      "Сколько стоит самоделка против готового чана",
    ],
  },
  {
    slug: "uhod-i-travy",
    image: "/illustrations/travy-i-masla.webp",
    title: "Уход за чаном и травы для купания",
    lead: "Чем наполняют чан, как его мыть, сливать и готовить к зиме.",
    outline: [
      "Что добавляют в банный чан",
      "Травяные сборы и запарки",
      "Как мыть и сливать чан",
      "Чан зимой",
      "Крышка и термокрышка",
    ],
  },
];

export const getTubGuide = (slug: string) => tubGuides.find((g) => g.slug === slug);

// Вопросы, которые люди задают в поиске. Ответы пишет эксперт проекта.
export const tubQuestions = [
  "Чем банный чан отличается от купели?",
  "Какая температура воды в банном чане?",
  "Сколько времени топится банный чан?",
  "Что добавляют в воду?",
  "Можно ли пользоваться чаном зимой?",
  "Какой размер чана нужен на 4 и на 6 человек?",
];
