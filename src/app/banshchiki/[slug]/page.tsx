import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DemoBadge, Facts, JsonLd, Notice, PageShell, Section, TextLink } from "@/components/site/parts";
import { getMaster, masters, scopeLabels } from "@/data/masters";
import { getVenue } from "@/data/venues";
import { absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => masters.map((m) => ({ slug: m.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const master = getMaster((await params).slug);
  if (!master) return {};
  return {
    title: `${master.name}, ${master.role.toLowerCase()}`,
    description: master.about,
    robots: master.demo ? { index: false } : undefined,
  };
}

export default async function MasterPage({ params }: Props) {
  const master = getMaster((await params).slug);
  if (!master) notFound();
  const venue = master.venueSlug ? getVenue(master.venueSlug) : undefined;

  return (
    <PageShell
      title={master.name}
      lead={master.role}
      crumbs={[
        { href: "/banshchiki", label: "Банщики" },
        { href: `/banshchiki/${master.slug}`, label: master.name },
      ]}
    >
      {master.demo && <DemoBadge />}
      <Section title="О мастере">
        <p className="max-w-3xl">{master.about}</p>
      </Section>
      <Section title="Основное">
        <Facts
          rows={[
            ["Что делает", scopeLabels[master.scope]],
            ["Город", master.city],
            ["Стаж", master.experienceYears ? `${master.experienceYears} лет` : null],
            ["Стоимость", master.pricePerSession],
            ["Стили парения", master.styles.join(", ") || null],
          ]}
        />
      </Section>
      <Section title="Видео работы">
        {master.videoUrl ? (
          <TextLink href={master.videoUrl}>Смотреть видео</TextLink>
        ) : (
          <Notice>Здесь будет видео парения. По нему гость выбирает мастера.</Notice>
        )}
      </Section>
      {venue && (
        <Section title="Где работает">
          <TextLink href={`/bani-na-drovah/${venue.slug}`}>{venue.name}</TextLink>
        </Section>
      )}
      {!master.demo && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Person",
            name: master.name,
            jobTitle: master.role,
            url: absoluteUrl(`/banshchiki/${master.slug}`),
          }}
        />
      )}
    </PageShell>
  );
}
