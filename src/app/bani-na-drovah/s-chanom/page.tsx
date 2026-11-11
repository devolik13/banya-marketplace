import type { Metadata } from "next";
import { PageShell } from "@/components/site/parts";
import { VenueList } from "@/components/site/venue-list";
import { venues, venueTags } from "@/data/venues";

const tag = venueTags["kupel"];

// Страница обновляется раз в час: так порядок выделенных карточек меняется каждый день сам.
export const revalidate = 3600;

export const metadata: Metadata = { title: tag.title, description: tag.lead };

export default function VenueTagPage() {
  return (
    <PageShell
      title={tag.title}
      lead={tag.lead}
      crumbs={[
        { href: "/bani-na-drovah", label: "Бани на дровах" },
        { href: `/bani-na-drovah/${tag.slug}`, label: tag.title },
      ]}
    >
      <VenueList items={venues.filter((v) => v.tags.includes("kupel"))} />
    </PageShell>
  );
}
