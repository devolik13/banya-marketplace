import Link from "next/link";
import { Play } from "lucide-react";
import { Avatar, DemoBadge, Tags } from "@/components/site/parts";
import { type Master, scopeLabels, serviceLabel } from "@/data/masters";

export function MasterCard({ master }: { master: Master }) {
  return (
    <Link
      href={`/banshchiki/${master.slug}`}
      className="group flex flex-col gap-4 rounded-xl border border-border bg-card p-5 transition duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-lg"
    >
      <div className="flex items-center gap-4">
        <Avatar name={master.name} src={master.photo} />
        <div className="min-w-0">
          <h3 className="text-lg group-hover:text-primary">{master.name}</h3>
          <p className="text-sm text-muted-foreground">{master.role}</p>
        </div>
        {master.demo && (
          <span className="ml-auto self-start">
            <DemoBadge />
          </span>
        )}
      </div>
      <p className="text-sm font-medium text-primary">{scopeLabels[master.scope]}</p>
      <Tags items={master.services.slice(0, 4).map(serviceLabel)} />
      <div className="mt-auto flex items-center justify-between border-t border-border pt-4 text-sm">
        <span className={master.pricePerSession ? "font-semibold" : "italic text-muted-foreground"}>
          {master.pricePerSession ?? "цена уточняется"}
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
