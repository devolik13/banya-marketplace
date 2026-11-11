"use client";

import { useState } from "react";
import { MasterCard } from "@/components/site/master-card";
import { type Master, type MasterScope, serviceGroups } from "@/data/masters";

const scopeFilters: { key: MasterScope | "all"; label: string }[] = [
  { key: "all", label: "Все мастера" },
  { key: "polnyy", label: "Банщики" },
  { key: "parenie", label: "Пармастера" },
];

const chip = (active: boolean) =>
  `rounded-full border px-3.5 py-1.5 text-sm transition ${
    active
      ? "border-primary bg-primary text-primary-foreground"
      : "border-border bg-card text-foreground/80 hover:border-primary/60"
  }`;

// Каталог с фильтрами. Все анкеты есть в коде страницы сразу, фильтр только скрывает лишние.
export function MasterCatalog({ masters }: { masters: Master[] }) {
  const [scope, setScope] = useState<MasterScope | "all">("all");
  const [services, setServices] = useState<string[]>([]);

  const toggle = (key: string) =>
    setServices((cur) => (cur.includes(key) ? cur.filter((k) => k !== key) : [...cur, key]));

  const shown = masters.filter(
    (m) => (scope === "all" || m.scope === scope) && services.every((s) => m.services.includes(s)),
  );

  return (
    <div>
      <div className="space-y-5 rounded-xl border border-border bg-card p-5">
        <div>
          <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Кто нужен</p>
          <div className="flex flex-wrap gap-2">
            {scopeFilters.map((f) => (
              <button key={f.key} type="button" aria-pressed={scope === f.key} onClick={() => setScope(f.key)} className={chip(scope === f.key)}>
                {f.label}
              </button>
            ))}
          </div>
        </div>
        {serviceGroups.map((group) => (
          <div key={group.title}>
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{group.title}</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(group.items).map(([key, label]) => (
                <button key={key} type="button" aria-pressed={services.includes(key)} onClick={() => toggle(key)} className={chip(services.includes(key))}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
        Показано {shown.length} из {masters.length}
      </p>

      {shown.length > 0 ? (
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((m) => (
            <MasterCard key={m.slug} master={m} />
          ))}
        </div>
      ) : (
        <p className="mt-4 rounded-xl border border-dashed border-border px-5 py-8 text-center text-muted-foreground">
          Под такие условия мастеров пока нет. Снимите один из фильтров.
        </p>
      )}
    </div>
  );
}
