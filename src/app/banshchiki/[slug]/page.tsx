import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, Minus, Play } from "lucide-react";
import { Avatar, DemoBadge, Facts, JsonLd, Notice, PageShell, Panel, Prose, Section, TextLink } from "@/components/site/parts";
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
      lead={`${master.role}. ${scopeLabels[master.scope]}.`}
      crumbs={[
        { href: "/banshchiki", label: "Банщики" },
        { href: `/banshchiki/${master.slug}`, label: master.name },
      ]}
      aside={master.demo ? <DemoBadge /> : undefined}
    >
      <div className="grid gap-10 lg:grid-cols-[20rem_1fr]">
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
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
                  ["Стоимость", master.pricePerSession],
                ]}
              />
            </div>
          </Panel>
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
            <div className="grid gap-6 sm:grid-cols-2">
              {serviceGroups.map((group) => (
                <Panel key={group.title} title={group.title}>
                  <ul className="space-y-2.5 text-sm">
                    {Object.entries(group.items).map(([key, label]) => {
                      const has = master.services.includes(key);
                      return (
                        <li key={key} className={`flex items-start gap-2.5 ${has ? "" : "text-muted-foreground/60"}`}>
                          {has ? (
                            <Check className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={3} aria-hidden="true" />
                          ) : (
                            <Minus className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                          )}
                          <span>
                            {label}
                            <span className="sr-only">{has ? " (делает)" : " (не делает)"}</span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </Panel>
              ))}
            </div>
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

          {master.demo && <Notice>Это образец анкеты. Настоящие анкеты заполняются по такому же шаблону.</Notice>}
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
          }}
        />
      )}
    </PageShell>
  );
}
