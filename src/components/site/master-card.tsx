import Link from "next/link";
import { Play } from "lucide-react";
import { Avatar, DemoBadge, PromoBadges, Tags } from "@/components/site/parts";
import { formatLabels, type Master, scopeLabels, serviceLabel } from "@/data/masters";

export function MasterCard({ master }: { master: Master }) {
  return (
    <Link
      href={`/banshchiki/${master.slug}`}
      className={`group flex flex-col gap-4 rounded-xl border bg-card p-5 transition duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-lg ${master.featured ? "border-primary/60" : "border-border"}`}
    >
      <div className="flex items-center gap-4">
        <Avatar name={master.name} src={master.photo} />
        <div className="min-w-0">
          <h3 className="text-lg group-hover:text-primary">{master.name}</h3>
          <p className="text-sm text-muted-foreground">{[master.role, master.city].filter(Boolean).join(", ")}</p>
        </div>
        <span className="ml-auto flex flex-col items-end gap-1.5 self-start">
          {master.demo && <DemoBadge />}
          <PromoBadges item={master} />
        </span>
      </div>
      <div>
        <p className="text-sm font-medium text-primary">{scopeLabels[master.scope]}</p>
        <p className="mt-1 text-sm text-muted-foreground">{master.formats.map((f) => formatLabels[f]).join(" · ")}</p>
      </div>
      <Tags items={master.services.slice(0, 4).map(serviceLabel)} />
      <div className="mt-auto flex items-center justify-between border-t border-border pt-4 text-sm">
        <span className={master.priceFrom ? "font-semibold" : "italic text-muted-foreground"}>
          {master.priceFrom ?? "цена уточняется"}
        </span>
        {master.videoUrl && (
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Play className="size-4" aria-hidden="true" /> видео
          </span>
        )}
      </div>
    </Link>
  );
}
