import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink, Illustration, Notice, PageShell, Section } from "@/components/site/parts";
import { SupplierCatalog } from "@/components/site/supplier-catalog";
import { featuredFirst } from "@/data/promo";
import { goodsCategoryList, suppliers } from "@/data/suppliers";

// Страница обновляется раз в час: так порядок выделенных карточек меняется каждый день сам.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Банные товары: веники, шапки, килты, травы",
  description:
    "Поставщики банных товаров: веники, шапки и рукавицы, килты и халаты, травы и масла, посуда. В розницу и оптом.",
};

export default function GoodsPage() {
  return (
    <PageShell
      title="Банные товары: веники, шапки, килты, травы"
      lead="Поставщики банных принадлежностей в одном месте. Для тех, кто покупает для себя, и для бань, которым нужен опт."
      crumbs={[{ href: "/bannye-tovary", label: "Банные товары" }]}
      aside={<Illustration src="/illustrations/venik-travy.webp" alt="" className="hidden size-44 shrink-0 md:block" />}
    >
      <Section title="Категории">
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {goodsCategoryList.map((c) => (
            <Link
              key={c.key}
              href={`/bannye-tovary/${c.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white transition duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-lg"
            >
              <img src={c.image} alt="" width={720} height={720} loading="lazy" className="aspect-square w-full object-contain p-3" />
              <span className="flex items-center justify-between gap-2 border-t border-border px-4 py-3 font-semibold group-hover:text-primary">
                {c.name}
                <ArrowRight className="size-4 shrink-0 text-primary transition group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
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
