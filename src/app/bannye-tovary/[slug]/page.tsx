import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactPanel, Cover, DemoBadge, Facts, Illustration, JsonLd, Notice, PageShell, Panel, PromoPanel, Prose, Section, Tags } from "@/components/site/parts";
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
        aside={<Illustration src={category.image} alt="" className="hidden size-44 shrink-0 md:block" />}
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
            {category.guide.sections && (
              <div className="mt-8 grid max-w-4xl gap-5 sm:grid-cols-2">
                {category.guide.sections.map((part) => (
                  <div key={part.title} className="flex gap-4 rounded-xl border border-border bg-card p-4">
                    {part.image && (
                      <img src={part.image} alt="" width={720} height={720} loading="lazy" className="size-24 shrink-0 object-contain" />
                    )}
                    <div>
                      <h3 className="text-lg">{part.title}</h3>
                      <p className="mt-2 text-sm text-foreground/85">{part.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
                ...(supplier.wholesale ? ([["Минимальный опт", supplier.minOrder]] as [string, string | null][]) : []),
              ]}
            />
            {supplier.checkedAt && <p className="mt-4 text-xs text-muted-foreground">Данные сверены: {supplier.checkedAt}</p>}
          </Panel>
          <ContactPanel contacts={supplier.contacts} demo={supplier.demo} siteLabel="Сайт поставщика" />
        </aside>
      </div>
      {!supplier.demo && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: supplier.name,
            url: supplier.contacts.site ?? absoluteUrl(`/bannye-tovary/${supplier.slug}`),
            telephone: supplier.contacts.phone ?? undefined,
          }}
        />
      )}
    </PageShell>
  );
}
