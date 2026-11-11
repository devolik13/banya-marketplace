import { CoverCard, Grid, JsonLd } from "@/components/site/parts";
import { featuredFirst } from "@/data/promo";
import type { Venue } from "@/data/venues";
import { absoluteUrl } from "@/lib/site";

export function VenueList({ items: all }: { items: Venue[] }) {
  const items = featuredFirst(all);
  const real = items.filter((v) => !v.demo);
  return (
    <>
      <Grid>
        {items.map((v) => (
          <CoverCard
            key={v.slug}
            href={`/bani-na-drovah/${v.slug}`}
            title={v.name}
            meta={[v.city, v.address].filter(Boolean).join(", ")}
            text={v.summary}
            tags={v.features}
            image={v.image}
            kind="venue"
            demo={v.demo}
            promo={v}
          />
        ))}
      </Grid>
      {real.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: real.map((v, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: v.name,
              url: absoluteUrl(`/bani-na-drovah/${v.slug}`),
            })),
          }}
        />
      )}
    </>
  );
}
