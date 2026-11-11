// Общие части карточек: контакты, прайс.

export type Contacts = {
  phone: string | null;
  telegram: string | null; // имя пользователя без «@»
  site: string | null;
};

export const noContacts: Contacts = { phone: null, telegram: null, site: null };
export const hasContacts = (c: Contacts) => Boolean(c.phone || c.telegram || c.site);
export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

export type ChecklistGroup = { title: string; items: Record<string, string> };
