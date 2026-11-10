import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DemoBadge, Facts, JsonLd, PageShell, Section } from "@/components/site/parts";
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
    >
      {school.demo && <DemoBadge />}
      <Section title="Основное">
        <Facts
          rows={[
            ["Город", school.city],
            ["Длительность", school.duration],
            ["Стоимость", school.price],
            ["Сайт", school.site],
          ]}
        />
      </Section>
      {!school.demo && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            name: school.name,
            url: school.site ?? absoluteUrl(`/shkoly-banshchikov/${school.slug}`),
          }}
        />
      )}
    </PageShell>
  );
}
