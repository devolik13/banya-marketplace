import type { Metadata } from "next";
import { PageShell, Section, TextLink } from "@/components/site/parts";
import { VenueList } from "@/components/site/venue-list";
import { venues, venueTags } from "@/data/venues";

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
      <Section title="Подборки">
        <ul className="flex flex-wrap gap-x-8 gap-y-2">
          {Object.values(venueTags).map((t) => (
            <li key={t.slug}>
              <TextLink href={`/bani-na-drovah/${t.slug}`}>{t.title}</TextLink>
            </li>
          ))}
        </ul>
      </Section>
      <Section title="Все бани">
        <VenueList items={venues} />
      </Section>
    </PageShell>
  );
}
