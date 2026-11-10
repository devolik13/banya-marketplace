import type { Metadata } from "next";
import { Notice, PageShell } from "@/components/site/parts";

export const metadata: Metadata = { title: "Политика конфиденциальности", robots: { index: false } };

export default function PrivacyPage() {
  return (
    <PageShell
      title="Политика конфиденциальности"
      crumbs={[{ href: "/politika-konfidentsialnosti", label: "Политика конфиденциальности" }]}
    >
      <Notice>
        Сейчас сайт не собирает персональные данные: на нём нет форм и регистрации. Политика будет
        опубликована до подключения формы заявки и анкет.
      </Notice>
    </PageShell>
  );
}
