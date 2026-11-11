import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink, ContactPanel, Cover, Facts, Illustration, Notice, PageShell, Panel, PromoPanel, Section } from "@/components/site/parts";
import { getTubBrand, getTubGuide, tubBrands, tubGuides } from "@/data/tubs";

type Props = { params: Promise<{ slug: string }> };

// По одному адресу живут и статьи раздела, и страницы производителей.
export const dynamicParams = false;
export const generateStaticParams = () => [...tubGuides, ...tubBrands].map((x) => ({ slug: x.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getTubGuide(slug);
  if (guide) return { title: guide.title, description: guide.lead };
  const brand = getTubBrand(slug);
  if (brand) {
    return {
      title: `${brand.name}: цены, модели, отзывы`,
      description: `Что известно о производителе «${brand.name}»: модели, цены, сроки, отзывы владельцев.`,
    };
  }
  return {};
}

export default async function TubPage({ params }: Props) {
  const { slug } = await params;
  const guide = getTubGuide(slug);
  const brand = getTubBrand(slug);
  const section = { href: "/bannye-chany", label: "Банные чаны" };

  if (guide) {
    return (
      <PageShell
        title={guide.title}
        lead={guide.lead}
        crumbs={[section, { href: `/bannye-chany/${guide.slug}`, label: guide.title }]}
        aside={<Illustration src={guide.image} alt="" className="hidden size-44 shrink-0 md:block" />}
      >
        <Section title="О чём статья">
          <ol className="max-w-3xl divide-y divide-border rounded-xl border border-border bg-card">
            {guide.outline.map((item, i) => (
              <li key={item} className="flex gap-4 px-5 py-4">
                <span className="font-semibold text-primary">{String(i + 1).padStart(2, "0")}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </Section>
        <Notice>Текст статьи готовится. Сейчас здесь только план.</Notice>
      </PageShell>
    );
  }

  if (!brand) notFound();

  return (
    <PageShell
      title={brand.name}
      lead={brand.summary ?? "Производитель банных чанов."}
      crumbs={[section, { href: `/bannye-chany/${brand.slug}`, label: brand.name }]}
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-8">
          <Cover src={brand.image} alt={brand.name} kind="tub" className="rounded-xl" />
          <Panel title="Характеристики">
            <Facts
              rows={[
                ["Материалы", brand.materials.join(", ") || null],
                ["Размеры", brand.sizes],
                ["Нагрев", brand.heating.join(", ") || null],
                ["Срок изготовления", brand.leadTime],
                ["Доставка", brand.delivery],
                ["Гарантия", brand.warranty],
              ]}
            />
          </Panel>
          <Notice>
            {brand.checkedAt
              ? `Данные взяты с сайта производителя и сверены: ${brand.checkedAt}.`
              : "Данные о производителе уточняются. На странице будут только проверенные факты с указанием даты."}
          </Notice>
        </div>
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <PromoPanel item={brand} />
          <Panel title="Основное">
            <Facts
              rows={[
                ["Регион", brand.region],
                ["Цены", brand.priceFrom],
              ]}
            />
            <div className="mt-5">
              <ButtonLink href="/bannye-chany#zayavka">Оставить заявку</ButtonLink>
            </div>
          </Panel>
          <ContactPanel contacts={brand.contacts} siteLabel="Сайт производителя" />
        </aside>
      </div>
    </PageShell>
  );
}
