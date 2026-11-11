import type { Metadata } from "next";
import { ButtonLink, Notice, PageShell, Prose, Section } from "@/components/site/parts";
import { MasterCatalog } from "@/components/site/master-catalog";
import { masters } from "@/data/masters";

export const metadata: Metadata = {
  title: "Банщики и пармастера: анкеты с ценами и видео",
  description:
    "Анкеты банщиков и пармастеров: услуги, стаж, стоимость, видео работы. Для гостей и для банных комплексов, которым нужен мастер.",
};

export default function MastersPage() {
  return (
    <PageShell
      title="Банщики и пармастера"
      lead="Анкеты мастеров: услуги, стаж, цена и видео работы. Раздел полезен и гостям, и банным комплексам, которым нужен мастер на смену или на мероприятие."
      crumbs={[{ href: "/banshchiki", label: "Банщики" }]}
    >
      <Section title="Мастера">
        <div className="mb-6">
          <Notice>Пока здесь образцы анкет. Настоящие анкеты появятся первыми при наполнении сайта.</Notice>
        </div>
        <MasterCatalog masters={masters} />
      </Section>

      <Section title="Чем банщик отличается от пармастера">
        <Prose>
          <p>
            Пармастер, или пармейстер, занимается только парением. Банщик это собирательное название:
            он и парит, и делает помывки, пилинги, массаж и контрастные процедуры.
          </p>
          <p>
            Топить печь и убирать баню обычно не входит в работу ни того, ни другого, этим занят
            персонал бани. Исключение составляют мастера, которые работают у себя и на себя.
            В каждой анкете отмечено, что именно делает мастер.
          </p>
        </Prose>
      </Section>

      <section className="flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-muted px-8 py-8">
        <div>
          <h2 className="text-xl sm:text-2xl">Вы банщик или пармейстер?</h2>
          <p className="mt-2 text-muted-foreground">Анкета размещается бесплатно.</p>
        </div>
        <ButtonLink href="/dobavit">Как попасть в каталог</ButtonLink>
      </section>
    </PageShell>
  );
}
