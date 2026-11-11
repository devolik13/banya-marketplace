import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Checklist,
  ContactPanel,
  Cover,
  DemoBadge,
  Facts,
  Gallery,
  Grid,
  JsonLd,
  PageShell,
  Panel,
  PromoPanel,
  Section,
} from "@/components/site/parts";
import { MasterCard } from "@/components/site/master-card";
import { masters } from "@/data/masters";
import { amenityGroups, getVenue, venues } from "@/data/venues";
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
        <div className="space-y-14">
          <div className="space-y-4">
            <Cover src={venue.image} alt={venue.name} kind="venue" className="rounded-xl" />
            <Gallery images={venue.gallery} alt={venue.name} hint="Здесь будут фотографии бани: парная, сруб, бассейн, купель." />
          </div>
          <Section title="Что есть в бане">
            <Checklist groups={amenityGroups} selected={venue.amenities} />
          </Section>
        </div>
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <PromoPanel item={venue} />
          <Panel title="Основное">
            <Facts
              rows={[
                ["Цена", venue.priceFrom],
                ["Вместимость", venue.capacity],
                ["Аренда", venue.minHours],
                ["Срубов", venue.cabins ? String(venue.cabins) : null],
                ["Режим работы", venue.hours],
                ["Город", venue.city],
                ["Район", venue.district],
                ["Адрес", venue.address],
              ]}
            />
            {venue.checkedAt && <p className="mt-4 text-xs text-muted-foreground">Данные сверены: {venue.checkedAt}</p>}
          </Panel>
          <ContactPanel contacts={venue.contacts} demo={venue.demo} siteLabel="Сайт бани" />
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
            url: venue.contacts.site ?? absoluteUrl(`/bani-na-drovah/${venue.slug}`),
            telephone: venue.contacts.phone ?? undefined,
            address: venue.address
              ? { "@type": "PostalAddress", addressLocality: venue.city, streetAddress: venue.address, addressCountry: "RU" }
              : undefined,
          }}
        />
      )}
    </PageShell>
  );
}
