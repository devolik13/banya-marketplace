import type { Metadata } from "next";
import { CoverCard, Grid, Notice, PageShell, Section } from "@/components/site/parts";
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
      lead="Школы и курсы для будущих банщиков и пармейстеров в одном месте. Программы, сроки и стоимость рядом, чтобы можно было сравнить."
      crumbs={[{ href: "/shkoly-banshchikov", label: "Школы банщиков" }]}
    >
      <Section title="Школы">
        <div className="mb-6">
          <Notice>Пока здесь образцы карточек. Школы добавляются после согласования с ними.</Notice>
        </div>
        <Grid>
          {schools.map((s) => (
            <CoverCard
              key={s.slug}
              href={`/shkoly-banshchikov/${s.slug}`}
              title={s.name}
              meta={s.city}
              text={s.summary}
              image={s.image}
              kind="school"
              demo={s.demo}
            />
          ))}
        </Grid>
      </Section>
    </PageShell>
  );
}
