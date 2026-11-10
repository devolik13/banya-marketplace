import type { Metadata } from "next";
import { CardLink, Grid, JsonLd, Notice, PageShell, Section } from "@/components/site/parts";
import { tubBrands, tubGuides, tubQuestions } from "@/data/tubs";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Банные чаны: производители, цены, как выбрать",
  description:
    "Производители банных чанов, цены и сравнение. Как выбрать чан, сколько стоит сделать своими руками, как ухаживать.",
};

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
            <CardLink key={g.slug} href={`/bannye-chany/${g.slug}`} title={g.title} text={g.lead} />
          ))}
        </Grid>
      </Section>

      <Section title="Производители">
        <Grid>
          {tubBrands.map((b) => (
            <CardLink
              key={b.slug}
              href={`/bannye-chany/${b.slug}`}
              title={b.name}
              meta={b.region ?? "Регион уточняется"}
              text={b.summary}
            />
          ))}
        </Grid>
      </Section>

      <Section title="Частые вопросы">
        <ul className="max-w-3xl list-disc space-y-2 pl-5">
          {tubQuestions.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ul>
        <div className="mt-5">
          <Notice>Ответы на эти вопросы готовятся. Их пишет эксперт проекта по опыту работы с чанами.</Notice>
        </div>
      </Section>

      <Section title="Заявка производителю">
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
