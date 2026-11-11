import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  BulletList,
  ContactPanel,
  Cover,
  DemoBadge,
  Facts,
  JsonLd,
  Notice,
  PageShell,
  Panel,
  PromoPanel,
  Section,
} from "@/components/site/parts";
import { getSchool, schools } from "@/data/schools";
import { absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => schools.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const school = getSchool((await params).slug);
  if (!school) return {};
  return {
    title: `${school.name}: обучение банщиков`,
    description: school.summary,
    robots: school.demo ? { index: false } : undefined,
  };
}

export default async function SchoolPage({ params }: Props) {
  const school = getSchool((await params).slug);
  if (!school) notFound();

  return (
    <PageShell
      title={school.name}
      lead={school.summary}
      crumbs={[
        { href: "/shkoly-banshchikov", label: "Школы банщиков" },
        { href: `/shkoly-banshchikov/${school.slug}`, label: school.name },
      ]}
      aside={school.demo ? <DemoBadge /> : undefined}
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-14">
          <Cover src={school.image} alt={school.name} kind="school" className="rounded-xl" />
          <Section title="Программы">
            {school.programs.length > 0 ? (
              <BulletList items={school.programs} />
            ) : (
              <Notice>Здесь будет список курсов школы.</Notice>
            )}
          </Section>
          <Notice>Здесь будет презентация школы: преподаватели, как проходит практика, отзывы выпускников.</Notice>
        </div>
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <PromoPanel item={school} />
          <Panel title="Основное">
            <Facts
              rows={[
                ["Город", school.city],
                ["Формат", school.format],
                ["Длительность", school.duration],
                ["Практика", school.practice],
                ["Стоимость", school.price],
                ["Документ", school.document],
              ]}
            />
            {school.checkedAt && <p className="mt-4 text-xs text-muted-foreground">Данные сверены: {school.checkedAt}</p>}
          </Panel>
          <ContactPanel contacts={school.contacts} demo={school.demo} siteLabel="Сайт школы" />
        </aside>
      </div>
      {!school.demo && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            name: school.name,
            url: school.contacts.site ?? absoluteUrl(`/shkoly-banshchikov/${school.slug}`),
            telephone: school.contacts.phone ?? undefined,
          }}
        />
      )}
    </PageShell>
  );
}
