// Поля для будущего платного размещения. Сейчас у всех карточек они выключены.
//
// featured  карточка стоит первой в каталоге и получает пометку «Выделено»
// partner   площадка получает вознаграждение от этой компании, об этом пишем прямо на странице
// promoCode кодовое слово: гость называет его и получает скидку, а компания видит, откуда он пришёл
// adMark    текст обязательной маркировки рекламы (рекламодатель и идентификатор), когда размещение оплачено
//
// Правило проекта: за деньги продаётся место и пометка, а не оценки и не отзывы.
export type Promo = {
  featured: boolean;
  partner: boolean;
  promoCode: string | null;
  adMark: string | null;
};

export const noPromo: Promo = { featured: false, partner: false, promoCode: null, adMark: null };

// Выделенные карточки идут первыми, порядок остальных не меняется.
export const featuredFirst = <T extends Promo>(items: T[]): T[] =>
  [...items].sort((a, b) => Number(b.featured) - Number(a.featured));
