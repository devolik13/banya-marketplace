import Link from "next/link";
import type { ReactNode } from "react";
import { absoluteUrl, nav, site } from "@/lib/site";

export function Header() {
  return (
    <header className="border-b border-border/20 bg-background">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-4 py-4 sm:px-6">
        <Link href="/" className="text-lg font-bold text-foreground">
          {site.name}
        </Link>
        <nav aria-label="Разделы сайта" className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-foreground hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border/20 bg-muted">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 text-sm sm:grid-cols-3 sm:px-6">
        <div>
          <p className="font-bold text-foreground">{site.name}</p>
          <p className="mt-2 text-muted-foreground">{site.shortDescription}.</p>
        </div>
        <nav aria-label="Разделы" className="flex flex-col gap-2">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>
        <nav aria-label="О проекте" className="flex flex-col gap-2">
          <Link href="/o-proekte" className="hover:text-primary">О проекте</Link>
          <Link href="/dobavit" className="hover:text-primary">Как попасть в каталог</Link>
          <Link href="/politika-konfidentsialnosti" className="hover:text-primary">
            Политика конфиденциальности
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export type Crumb = { href: string; label: string };

// Заголовок страницы с «хлебными крошками» и разметкой крошек для поисковиков.
export function PageShell({
  title,
  lead,
  crumbs = [],
  children,
}: {
  title: string;
  lead?: string;
  crumbs?: Crumb[];
  children: ReactNode;
}) {
  const trail = [{ href: "/", label: "Главная" }, ...crumbs];
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      {crumbs.length > 0 && (
        <>
          <nav aria-label="Навигация по разделу" className="mb-6 text-sm text-muted-foreground">
            {trail.map((c, i) => (
              <span key={c.href}>
                {i > 0 && <span className="mx-2">/</span>}
                {i < trail.length - 1 ? (
                  <Link href={c.href} className="hover:text-primary">{c.label}</Link>
                ) : (
                  <span className="text-foreground">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: trail.map((c, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: c.label,
                item: absoluteUrl(c.href),
              })),
            }}
          />
        </>
      )}
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h1>
      {lead && <p className="mt-4 max-w-3xl text-lg text-muted-foreground">{lead}</p>}
      <div className="mt-10 space-y-14">{children}</div>
    </main>
  );
}

export function Section({ title, children, id }: { title: string; children: ReactNode; id?: string }) {
  return (
    <section id={id}>
      <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function Grid({ children }: { children: ReactNode }) {
  return <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{children}</div>;
}

// Карточка-ссылка для каталогов.
export function CardLink({
  href,
  title,
  meta,
  text,
  tags = [],
  demo = false,
}: {
  href: string;
  title: string;
  meta?: string;
  text?: string | null;
  tags?: string[];
  demo?: boolean;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col rounded-lg border border-border/25 bg-card p-5 transition hover:border-primary hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {demo && <DemoBadge />}
      </div>
      {meta && <p className="mt-1 text-sm text-muted-foreground">{meta}</p>}
      {text && <p className="mt-3 text-sm text-foreground">{text}</p>}
      {tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {tags.map((t) => (
            <li key={t} className="rounded-full border border-border/30 bg-background px-3 py-1 text-xs">
              {t}
            </li>
          ))}
        </ul>
      )}
    </Link>
  );
}

export function DemoBadge() {
  return (
    <span className="shrink-0 rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
      образец
    </span>
  );
}

// Плашка для разделов, где пока нет настоящих данных.
export function Notice({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-lg border border-dashed border-primary/60 bg-background px-4 py-3 text-sm text-muted-foreground">
      {children}
    </p>
  );
}

export function Facts({ rows }: { rows: [string, string | null | undefined][] }) {
  return (
    <dl className="grid max-w-2xl grid-cols-[minmax(8rem,auto)_1fr] gap-x-6 gap-y-3 text-sm">
      {rows.map(([k, v]) => (
        <div key={k} className="contents">
          <dt className="text-muted-foreground">{k}</dt>
          <dd className={v ? "text-foreground" : "text-muted-foreground italic"}>{v ?? "уточняется"}</dd>
        </div>
      ))}
    </dl>
  );
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Экранируем «<», чтобы данные не могли закрыть тег script.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="font-semibold text-primary hover:underline">
      {children}
    </Link>
  );
}
