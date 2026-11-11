import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cover, DemoBadge, Facts, JsonLd, Notice, PageShell, Panel, PromoPanel, Prose, Section, Tags } from "@/components/site/parts";
import { SupplierCatalog } from "@/components/site/supplier-catalog";
import { featuredFirst } from "@/data/promo";
import { getGoodsCategory, getSupplier, goodsCategories, goodsCategoryList, saleLabel, suppliers } from "@/data/suppliers";
import { absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

// По одному адресу живут и страницы категорий, и карточки поставщиков.
export const dynamicParams = false;
export const revalidate = 3600;
export const generateStaticParams = () => [...goodsCategoryList, ...suppliers].map((x) => ({ slug: x.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getGoodsCategory(slug);
  if (category) return { title: category.title, description: category.lead };
  const supplier = getSupplier(slug);
  if (supplier) {
    return {
      title: `${supplier.name}: банные товары`,
      description: supplier.summary,
      robots: supplier.demo ? { index: false } : undefined,
    };
  }
  return {};
}

export default async function GoodsSlugPage({ params }: Props) {
  const { slug } = await params;
  const section = { href: "/bannye-tovary", label: "Банные товары" };
  const category = getGoodsCategory(slug);

  if (category) {
    const items = suppliers.filter((s) => s.categories.includes(category.key));
    return (
      <PageShell
        title={category.title}
        lead={category.lead}
        crumbs={[section, { href: `/bannye-tovary/${category.slug}`, label: category.name }]}
      >
        <Section title="Поставщики">
          <SupplierCatalog suppliers={featuredFirst(items)} />
        </Section>
        {category.guide ? (
          <Section title={category.guide.title}>
            <Prose>
              {category.guide.paragraphs.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </Prose>
          </Section>
        ) : (
          <Notice>Здесь появится короткий гид по выбору от практиков: на что смотреть и чем отличаются варианты.</Notice>
        )}
      </PageShell>
    );
  }

  const supplier = getSupplier(slug);
  if (!supplier) notFound();

  return (
    <PageShell
      title={supplier.name}
      lead={supplier.summary}
      crumbs={[section, { href: `/bannye-tovary/${supplier.slug}`, label: supplier.name }]}
      aside={supplier.demo ? <DemoBadge /> : undefined}
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-8">
          <Cover src={supplier.image} alt={supplier.name} kind="goods" className="rounded-xl" />
          <div>
            <h2 className="mb-4 text-2xl">Что продаёт</h2>
            <Tags items={supplier.categories.map((c) => goodsCategories[c].name)} />
          </div>
          {supplier.demo && <Notice>Это образец карточки. Настоящие карточки заполняются по такому же шаблону.</Notice>}
        </div>
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <PromoPanel item={supplier} />
          <Panel title="Основное">
            <Facts
              rows={[
                ["Продажа", saleLabel(supplier)],
                ["Город", supplier.city],
                ["Доставка", supplier.delivery],
              ]}
            />
            {supplier.site && (
              <a
                href={supplier.site}
                rel="noopener"
                className="mt-5 block rounded-lg bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Перейти на сайт поставщика
              </a>
            )}
          </Panel>
        </aside>
      </div>
      {!supplier.demo && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: supplier.name,
            url: supplier.site ?? absoluteUrl(`/bannye-tovary/${supplier.slug}`),
          }}
        />
      )}
    </PageShell>
  );
}
