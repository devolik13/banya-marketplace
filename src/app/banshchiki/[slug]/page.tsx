import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DemoBadge, Facts, JsonLd, Notice, PageShell, Section, TextLink } from "@/components/site/parts";
import { getMaster, masters, scopeLabels, serviceGroups } from "@/data/masters";
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
      {master.demo && (
        <div>
          <DemoBadge />
        </div>
      )}
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
          ]}
        />
      </Section>
      <Section title="Услуги">
        <div className="grid max-w-3xl gap-8 sm:grid-cols-2">
          {serviceGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-base font-semibold text-foreground">{group.title}</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {Object.entries(group.items).map(([key, label]) => {
                  const has = master.services.includes(key);
                  return (
                    <li key={key} className={has ? "text-foreground" : "text-muted-foreground/70"}>
                      <span aria-hidden="true">{has ? "✓ " : "— "}</span>
                      {label}
                      <span className="sr-only">{has ? " (делает)" : " (не делает)"}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
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
