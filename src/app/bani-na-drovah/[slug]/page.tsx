import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cover, DemoBadge, Facts, Grid, JsonLd, Notice, PageShell, Panel, PromoPanel, Section, Tags } from "@/components/site/parts";
import { MasterCard } from "@/components/site/master-card";
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
      aside={venue.demo ? <DemoBadge /> : undefined}
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-8">
          <Cover src={venue.image} alt={venue.name} kind="venue" className="rounded-xl" />
          {!venue.image && <Notice>Здесь будут фотографии бани: парная, сруб, бассейн, купель.</Notice>}
          <div>
            <h2 className="mb-4 text-2xl">Что есть</h2>
            <Tags items={venue.features} />
          </div>
        </div>
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <PromoPanel item={venue} />
          <Panel title="Основное">
            <Facts
              rows={[
                ["Город", venue.city],
                ["Адрес", venue.address],
                ["Срубов", venue.cabins ? String(venue.cabins) : null],
                ["Режим работы", venue.hours],
              ]}
            />
            {venue.site && (
              <a
                href={venue.site}
                rel="noopener"
                className="mt-5 block rounded-lg bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Перейти на сайт бани
              </a>
            )}
          </Panel>
        </aside>
      </div>

      {staff.length > 0 && (
        <Section title="Мастера этой бани">
          <Grid>
            {staff.map((m) => (
              <MasterCard key={m.slug} master={m} />
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
