import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, Section } from "@/components/site/parts";
import { VenueList } from "@/components/site/venue-list";
import { venues, venueTags } from "@/data/venues";

// Страница обновляется раз в час: так порядок выделенных карточек меняется каждый день сам.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Бани на дровах в Москве и Подмосковье",
  description:
    "Каталог бань с дровяной печью: отдельные срубы, бассейны, купели и чаны, свои пармастера. Без саун и электрических парных.",
};

export default function VenuesPage() {
  return (
    <PageShell
      title="Бани на дровах в Москве и Подмосковье"
      lead="Только бани с дровяной печью. Сауны и электрические парные в каталог не входят."
      crumbs={[{ href: "/bani-na-drovah", label: "Бани на дровах" }]}
    >
      <Section title="Все бани">
        <ul className="mb-7 flex flex-wrap gap-2">
          {Object.values(venueTags).map((t) => (
            <li key={t.slug}>
              <Link
                href={`/bani-na-drovah/${t.slug}`}
                className="inline-block rounded-full border border-border bg-card px-4 py-2 text-sm hover:border-primary hover:text-primary"
              >
                {t.short}
              </Link>
            </li>
          ))}
        </ul>
        <VenueList items={venues} />
      </Section>
    </PageShell>
  );
}
