import type { Metadata } from "next";
import { BookOpen, Hammer, Leaf } from "lucide-react";
import { CoverCard, Grid, JsonLd, Notice, PageShell, Section, TextCard } from "@/components/site/parts";
import { tubBrands, tubGuides, tubQuestions } from "@/data/tubs";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Банные чаны: производители, цены, как выбрать",
  description:
    "Производители банных чанов, цены и сравнение. Как выбрать чан, сколько стоит сделать своими руками, как ухаживать.",
};

const guideIcons = { "kak-vybrat": BookOpen, "svoimi-rukami": Hammer, "uhod-i-travy": Leaf } as const;

export default function TubsPage() {
  return (
    <PageShell
      title="Банные чаны: производители, цены, как выбрать"
      lead="Независимый обзор производителей банных чанов и купелей. Сравнение, цены и советы от тех, кто работает с чанами каждый день."
      crumbs={[{ href: "/bannye-chany", label: "Банные чаны" }]}
    >
      <Section title="С чего начать">
        <Grid>
          {tubGuides.map((g) => (
            <TextCard
              key={g.slug}
              href={`/bannye-chany/${g.slug}`}
              title={g.title}
              text={g.lead}
              icon={guideIcons[g.slug as keyof typeof guideIcons]}
            />
          ))}
        </Grid>
      </Section>

      <Section title="Производители" lead="Список составлен по названиям, которые люди чаще всего ищут. Порядок не означает оценку.">
        <Grid>
          {tubBrands.map((b) => (
            <CoverCard
              key={b.slug}
              href={`/bannye-chany/${b.slug}`}
              title={b.name}
              meta={b.region ?? "Регион уточняется"}
              text={b.summary}
              image={b.image}
              kind="tub"
            />
          ))}
        </Grid>
      </Section>

      <Section title="Частые вопросы">
        <ul className="max-w-3xl divide-y divide-border rounded-xl border border-border bg-card">
          {tubQuestions.map((q) => (
            <li key={q} className="flex items-center justify-between gap-4 px-5 py-4">
              <span className="font-medium">{q}</span>
              <span className="shrink-0 text-xs text-muted-foreground">ответ готовится</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Заявка производителю" id="zayavka">
        <Notice>
          Здесь будет форма: вы оставляете заявку, мы передаём её производителю. Форма подключается перед запуском.
        </Notice>
      </Section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: tubBrands.map((b, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: b.name,
            url: absoluteUrl(`/bannye-chany/${b.slug}`),
          })),
        }}
      />
    </PageShell>
  );
}
