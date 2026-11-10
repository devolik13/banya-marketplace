import type { Metadata } from "next";
import { CardLink, Grid, Notice, PageShell, Section } from "@/components/site/parts";
import { schools } from "@/data/schools";

export const metadata: Metadata = {
  title: "Школы банщиков: обучение банному мастерству",
  description:
    "Школы и курсы банщиков и пармастеров в одном месте: программы, сроки, стоимость. Можно сравнить и выбрать.",
};

export default function SchoolsPage() {
  return (
    <PageShell
      title="Школы банщиков"
      lead="Школы и курсы банного мастерства в одном месте. Программы, сроки и стоимость рядом, чтобы можно было сравнить."
      crumbs={[{ href: "/shkoly-banshchikov", label: "Школы банщиков" }]}
    >
      <Notice>Пока здесь образцы карточек. Школы добавляются после согласования с ними.</Notice>
      <Section title="Школы">
        <Grid>
          {schools.map((s) => (
            <CardLink
              key={s.slug}
              href={`/shkoly-banshchikov/${s.slug}`}
              title={s.name}
              meta={s.city ?? undefined}
              text={s.summary}
              demo={s.demo}
            />
          ))}
        </Grid>
      </Section>
    </PageShell>
  );
}
