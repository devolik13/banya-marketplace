"use client";

import { useState } from "react";
import { CoverCard } from "@/components/site/parts";
import { goodsCategories, saleLabel, type Supplier } from "@/data/suppliers";

type Mode = "all" | "retail" | "wholesale";

const modes: { key: Mode; label: string }[] = [
  { key: "all", label: "Все" },
  { key: "retail", label: "Розница" },
  { key: "wholesale", label: "Опт" },
];

// Каталог поставщиков с переключателем «розница или опт». Все карточки есть в коде страницы сразу.
export function SupplierCatalog({ suppliers }: { suppliers: Supplier[] }) {
  const [mode, setMode] = useState<Mode>("all");
  const shown = suppliers.filter((s) => mode === "all" || s[mode]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {modes.map((m) => (
          <button
            key={m.key}
            type="button"
            aria-pressed={mode === m.key}
            onClick={() => setMode(m.key)}
            className={`rounded-full border px-4 py-1.5 text-sm transition ${
              mode === m.key
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground/80 hover:border-primary/60"
            }`}
          >
            {m.label}
          </button>
        ))}
        <p className="ml-auto text-sm text-muted-foreground" aria-live="polite">
          Показано {shown.length} из {suppliers.length}
        </p>
      </div>

      {shown.length > 0 ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((s) => (
            <CoverCard
              key={s.slug}
              href={`/bannye-tovary/${s.slug}`}
              title={s.name}
              meta={[s.city, saleLabel(s)].filter(Boolean).join(" · ")}
              text={s.summary}
              tags={s.categories.map((c) => goodsCategories[c].name)}
              image={s.image}
              kind="goods"
              demo={s.demo}
              promo={s}
            />
          ))}
        </div>
      ) : (
        <p className="mt-6 rounded-xl border border-dashed border-border px-5 py-8 text-center text-muted-foreground">
          Таких поставщиков пока нет.
        </p>
      )}
    </div>
  );
}
