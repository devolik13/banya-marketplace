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

// Номер текущего дня по московскому времени. От него зависит, кто из выделенных стоит первым.
const MOSCOW_OFFSET_MS = 3 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;
export const moscowDayNumber = (now: number = Date.now()) => Math.floor((now + MOSCOW_OFFSET_MS) / DAY_MS);

// Выделенные карточки идут первыми. Если их несколько, порядок сдвигается на одну позицию каждый день:
// за столько дней, сколько выделенных карточек, каждая побывает на каждом месте ровно один раз.
// Порядок остальных карточек не меняется.
export const featuredFirst = <T extends Promo>(items: T[], day: number = moscowDayNumber()): T[] => {
  const featured = items.filter((i) => i.featured);
  const rest = items.filter((i) => !i.featured);
  if (featured.length < 2) return [...featured, ...rest];
  const start = ((day % featured.length) + featured.length) % featured.length;
  return [...featured.slice(start), ...featured.slice(0, start), ...rest];
};
