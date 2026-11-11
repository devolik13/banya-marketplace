import type { Metadata } from "next";
import { Hand, Shirt, Soup, Sprout, TreeDeciduous } from "lucide-react";
import { ButtonLink, Notice, PageShell, Section, TextCard } from "@/components/site/parts";
import { SupplierCatalog } from "@/components/site/supplier-catalog";
import { featuredFirst } from "@/data/promo";
import { type GoodsCategoryKey, goodsCategoryList, suppliers } from "@/data/suppliers";

// Страница обновляется раз в час: так порядок выделенных карточек меняется каждый день сам.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Банные товары: веники, шапки, халаты, травы",
  description:
    "Поставщики банных товаров: веники, халаты и текстиль, шапки и рукавицы, травы и масла, посуда. В розницу и оптом.",
};

const icons: Record<GoodsCategoryKey, typeof Hand> = {
  veniki: TreeDeciduous,
  tekstil: Shirt,
  shapki: Hand,
  travy: Sprout,
  posuda: Soup,
};

export default function GoodsPage() {
  return (
    <PageShell
      title="Банные товары: веники, шапки, халаты, травы"
      lead="Поставщики банных принадлежностей в одном месте. Для тех, кто покупает для себя, и для бань, которым нужен опт."
      crumbs={[{ href: "/bannye-tovary", label: "Банные товары" }]}
    >
      <Section title="Категории">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {goodsCategoryList.map((c) => (
            <TextCard key={c.key} href={`/bannye-tovary/${c.slug}`} title={c.name} icon={icons[c.key]} />
          ))}
        </div>
      </Section>

      <Section title="Поставщики" lead="Площадка сама ничего не продаёт: в карточке указано, что и как продаёт поставщик, и ссылка на него.">
        <div className="mb-6">
          <Notice>Пока здесь образцы карточек. Настоящие поставщики добавляются при наполнении сайта.</Notice>
        </div>
        <SupplierCatalog suppliers={featuredFirst(suppliers)} />
      </Section>

      <section className="flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-muted px-8 py-8">
        <div>
          <h2 className="text-xl sm:text-2xl">Вы поставщик банных товаров?</h2>
          <p className="mt-2 text-muted-foreground">Карточка в каталоге размещается бесплатно.</p>
        </div>
        <ButtonLink href="/dobavit">Как попасть в каталог</ButtonLink>
      </section>
    </PageShell>
  );
}
