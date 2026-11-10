import type { Metadata } from "next";
import { CardLink, Grid, Notice, PageShell, Section, TextLink } from "@/components/site/parts";
import { masters, scopeLabels, serviceLabel } from "@/data/masters";

export const metadata: Metadata = {
  title: "Банщики и пармастера: анкеты с ценами и видео",
  description:
    "Анкеты банщиков и пармастеров: стаж, стиль парения, стоимость, видео работы. Для гостей и для банных комплексов, которым нужен мастер.",
};

export default function MastersPage() {
  return (
    <PageShell
      title="Банщики и пармастера"
      lead="Анкеты мастеров парения: стаж, стиль, цена и видео работы. Раздел полезен и гостям, и банным комплексам, которым нужен мастер на смену или на мероприятие."
      crumbs={[{ href: "/banshchiki", label: "Банщики" }]}
    >
      <Notice>
        Пока здесь образцы анкет. Настоящие анкеты появятся первыми при наполнении сайта.
      </Notice>
      <Section title="Чем банщик отличается от пармастера">
        <p className="max-w-3xl">
          Пармастер, или пармейстер, занимается только парением. Банщик делает весь набор банных
          процедур: кроме парения это помывки, пилинги и контрастные процедуры. Топить печь и убирать
          баню обычно не входит в работу ни того, ни другого, этим занят персонал бани. Исключение
          составляют мастера, которые работают у себя и на себя. В каждой анкете отмечено, что именно
          делает мастер.
        </p>
      </Section>
      <Section title="Мастера">
        <Grid>
          {masters.map((m) => (
            <CardLink
              key={m.slug}
              href={`/banshchiki/${m.slug}`}
              title={m.name}
              meta={`${m.role} · ${scopeLabels[m.scope].toLowerCase()}`}
              text={m.about}
              tags={m.services.slice(0, 3).map(serviceLabel)}
              demo={m.demo}
            />
          ))}
        </Grid>
      </Section>
      <Section title="Вы банщик или пармейстер?">
        <p className="max-w-3xl">
          Анкета размещается бесплатно. Условия описаны на странице{" "}
          <TextLink href="/dobavit">как попасть в каталог</TextLink>.
        </p>
      </Section>
    </PageShell>
  );
}
