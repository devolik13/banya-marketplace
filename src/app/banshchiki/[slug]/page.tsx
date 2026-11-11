import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BadgeCheck, Play } from "lucide-react";
import {
  Avatar,
  BulletList,
  Checklist,
  ContactPanel,
  DemoBadge,
  Facts,
  Gallery,
  JsonLd,
  Notice,
  PageShell,
  Panel,
  PriceTable,
  PromoPanel,
  Prose,
  Section,
  TextLink,
} from "@/components/site/parts";
import { formatLabels, getMaster, masters, scopeLabels, serviceGroups } from "@/data/masters";
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
      lead={`${master.role}. ${scopeLabels[master.scope]}.`}
      crumbs={[
        { href: "/banshchiki", label: "Банщики" },
        { href: `/banshchiki/${master.slug}`, label: master.name },
      ]}
      aside={master.demo ? <DemoBadge /> : undefined}
    >
      <div className="grid gap-10 lg:grid-cols-[20rem_1fr]">
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <PromoPanel item={master} />
          <Panel>
            <div className="flex flex-col items-center text-center">
              <Avatar name={master.name} src={master.photo} size="lg" />
              <p className="mt-4 text-lg font-semibold">{master.name}</p>
              <p className="text-sm text-muted-foreground">{master.role}</p>
            </div>
            <div className="mt-6">
              <Facts
                rows={[
                  ["Город", master.city],
                  ["Стаж", master.experienceYears ? `${master.experienceYears} лет` : null],
                  ["Формат", master.formats.map((f) => formatLabels[f]).join(", ") || null],
                  ["Цена", master.priceFrom],
                ]}
              />
            </div>
            {master.openToVenues && (
              <p className="mt-5 flex items-start gap-2 rounded-lg bg-accent/60 px-3 py-2.5 text-sm">
                <BadgeCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                Берёт смены и мероприятия в банных комплексах
              </p>
            )}
          </Panel>
          <ContactPanel contacts={master.contacts} demo={master.demo} siteLabel="Сайт мастера" />
          {venue && (
            <Panel title="Где работает">
              <TextLink href={`/bani-na-drovah/${venue.slug}`}>{venue.name}</TextLink>
              <p className="mt-1 text-sm text-muted-foreground">{[venue.city, venue.address].filter(Boolean).join(", ")}</p>
            </Panel>
          )}
        </aside>

        <div className="space-y-14">
          <Section title="О мастере">
            <Prose>
              <p>{master.about}</p>
            </Prose>
          </Section>

          <Section title="Услуги">
            <Checklist groups={serviceGroups} selected={master.services} />
          </Section>

          <Section title="Цены">
            {master.prices.length > 0 ? (
              <PriceTable lines={master.prices} />
            ) : (
              <Notice>Здесь будет прайс мастера: услуга, длительность и цена.</Notice>
            )}
          </Section>

          <Section title="Видео работы">
            {master.videoUrl ? (
              <TextLink href={master.videoUrl}>Смотреть видео</TextLink>
            ) : (
              <div className="grid aspect-video place-items-center rounded-xl bg-gradient-to-br from-ink-soft to-ink text-center text-ink-foreground/70">
                <div>
                  <span className="mx-auto grid size-16 place-items-center rounded-full bg-gold/90 text-ink">
                    <Play className="size-7 translate-x-0.5" aria-hidden="true" />
                  </span>
                  <p className="mt-4 text-sm">Здесь будет видео парения. По нему гость выбирает мастера.</p>
                </div>
              </div>
            )}
          </Section>

          <Section title="Фотографии">
            <Gallery images={master.gallery} alt={master.name} hint="Здесь будут фотографии мастера за работой." />
          </Section>

          {master.education.length > 0 && (
            <Section title="Обучение">
              <BulletList items={master.education} />
            </Section>
          )}

          {master.achievements.length > 0 && (
            <Section title="Достижения">
              <BulletList items={master.achievements} />
            </Section>
          )}

          {master.demo && (
            <Notice>Это образец анкеты. Цены и записи в нём условные, настоящие анкеты заполняются по такому же шаблону.</Notice>
          )}
        </div>
      </div>

      {!master.demo && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Person",
            name: master.name,
            jobTitle: master.role,
            url: absoluteUrl(`/banshchiki/${master.slug}`),
            telephone: master.contacts.phone ?? undefined,
          }}
        />
      )}
    </PageShell>
  );
}
