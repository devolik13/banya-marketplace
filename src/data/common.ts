// Общие части карточек: контакты, прайс.

export type Contacts = {
  phone: string | null;
  telegram: string | null; // имя пользователя без «@»
  site: string | null;
};

export const noContacts: Contacts = { phone: null, telegram: null, site: null };
export const hasContacts = (c: Contacts) => Boolean(c.phone || c.telegram || c.site);
export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

// Строка прайса: услуга, цена и необязательное уточнение («1 час, 1 гость»).
export type PriceLine = { service: string; price: string; note?: string };

export type ChecklistGroup = { title: string; items: Record<string, string> };
