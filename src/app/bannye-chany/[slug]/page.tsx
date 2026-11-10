import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Facts, Notice, PageShell, Section } from "@/components/site/parts";
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
      >
        <Section title="О чём статья">
          <ol className="max-w-3xl list-decimal space-y-2 pl-5">
            {guide.outline.map((item) => (
              <li key={item}>{item}</li>
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
      <Section title="Основное">
        <Facts
          rows={[
            ["Регион", brand.region],
            ["Цены", brand.priceFrom],
            ["Сайт", brand.site],
          ]}
        />
      </Section>
      <Notice>
        Данные о производителе уточняются. На странице будут только проверенные факты с указанием даты.
      </Notice>
    </PageShell>
  );
}
