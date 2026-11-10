import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CardLink, DemoBadge, Facts, Grid, JsonLd, PageShell, Section } from "@/components/site/parts";
import { masters } from "@/data/masters";
import { getVenue, venues } from "@/data/venues";
import { absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => venues.map((v) => ({ slug: v.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const venue = getVenue((await params).slug);
  if (!venue) return {};
  return {
    title: `${venue.name}: баня на дровах`,
    description: venue.summary,
    robots: venue.demo ? { index: false } : undefined,
  };
}

export default async function VenuePage({ params }: Props) {
  const venue = getVenue((await params).slug);
  if (!venue) notFound();
  const staff = masters.filter((m) => m.venueSlug === venue.slug);

  return (
    <PageShell
      title={venue.name}
      lead={venue.summary}
      crumbs={[
        { href: "/bani-na-drovah", label: "Бани на дровах" },
        { href: `/bani-na-drovah/${venue.slug}`, label: venue.name },
      ]}
    >
      {venue.demo && <DemoBadge />}
      <Section title="Основное">
        <Facts
          rows={[
            ["Город", venue.city],
            ["Адрес", venue.address],
            ["Срубов", venue.cabins ? String(venue.cabins) : null],
            ["Режим работы", venue.hours],
            ["Сайт", venue.site],
          ]}
        />
      </Section>
      <Section title="Что есть">
        <ul className="flex flex-wrap gap-2">
          {venue.features.map((f) => (
            <li key={f} className="rounded-full border border-border/30 bg-card px-3 py-1 text-sm">{f}</li>
          ))}
        </ul>
      </Section>
      {staff.length > 0 && (
        <Section title="Мастера этой бани">
          <Grid>
            {staff.map((m) => (
              <CardLink key={m.slug} href={`/banshchiki/${m.slug}`} title={m.name} meta={m.role} tags={m.styles} demo={m.demo} />
            ))}
          </Grid>
        </Section>
      )}
      {!venue.demo && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: venue.name,
            url: venue.site ?? absoluteUrl(`/bani-na-drovah/${venue.slug}`),
            address: venue.address
              ? { "@type": "PostalAddress", addressLocality: venue.city, streetAddress: venue.address, addressCountry: "RU" }
              : undefined,
          }}
        />
      )}
    </PageShell>
  );
}
