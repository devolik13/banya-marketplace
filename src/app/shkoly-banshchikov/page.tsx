import type { Metadata } from "next";
import { CoverCard, Grid, Notice, PageShell, Section } from "@/components/site/parts";
import { featuredFirst } from "@/data/promo";
import { schools } from "@/data/schools";

// Страница обновляется раз в час: так порядок выделенных карточек меняется каждый день сам.
export const revalidate = 3600;

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
          {featuredFirst(schools).map((s) => (
            <CoverCard
              key={s.slug}
              href={`/shkoly-banshchikov/${s.slug}`}
              title={s.name}
              meta={s.city}
              text={s.summary}
              image={s.image}
              kind="school"
              demo={s.demo}
              promo={s}
            />
          ))}
        </Grid>
      </Section>
    </PageShell>
  );
}
