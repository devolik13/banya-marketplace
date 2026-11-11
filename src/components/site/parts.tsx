import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Bath, Check, Flame, Globe, GraduationCap, type LucideIcon, Minus, Package, Phone, Send, UserRound } from "lucide-react";
import { type ChecklistGroup, type Contacts, hasContacts, telHref } from "@/data/common";
import type { Promo } from "@/data/promo";
import { absoluteUrl, nav, site } from "@/lib/site";

/* ───────── Логотип и иллюстрации ───────── */

// Знак «Три веника»: дубовый, берёзовый и пихтовый веники. Файл лежит в public/logo.webp.
export function Logo({ className = "h-10" }: { className?: string }) {
  return <img src="/logo.webp" alt="" width={220} height={192} className={`${className} w-auto`} />;
}

// Иллюстрация предмета на белой плитке. Это рисунки, а не фотографии конкретных товаров.
export function Illustration({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-border bg-white ${className}`}>
      <img src={src} alt={alt} width={720} height={720} loading="lazy" className="size-full object-contain" />
    </div>
  );
}

/* ───────── Шапка и подвал ───────── */

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-8 gap-y-2 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 text-lg font-bold text-foreground">
          <Logo />
          {site.name}
        </Link>
        <nav aria-label="Разделы сайта" className="flex flex-wrap gap-x-6 gap-y-1 text-sm font-medium sm:ml-auto">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="py-1 text-foreground/80 hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/dobavit"
          className="hidden rounded-lg border border-foreground/15 px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary lg:block"
        >
          Добавить анкету
        </Link>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 text-sm sm:grid-cols-3 sm:px-6">
        <div>
          <p className="flex items-center gap-2.5 text-base font-bold">
            <Logo className="h-9" />
            {site.name}
          </p>
          <p className="mt-3 max-w-xs text-ink-foreground/65">{site.shortDescription}.</p>
        </div>
        <nav aria-label="Разделы" className="flex flex-col gap-2.5">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gold">Разделы</p>
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-ink-foreground/80 hover:text-gold">
              {item.label}
            </Link>
          ))}
        </nav>
        <nav aria-label="О проекте" className="flex flex-col gap-2.5">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gold">Проект</p>
          <Link href="/o-proekte" className="text-ink-foreground/80 hover:text-gold">О проекте</Link>
          <Link href="/dobavit" className="text-ink-foreground/80 hover:text-gold">Как попасть в каталог</Link>
          <Link href="/politika-konfidentsialnosti" className="text-ink-foreground/80 hover:text-gold">
            Политика конфиденциальности
          </Link>
        </nav>
      </div>
    </footer>
  );
}

/* ───────── Каркас внутренней страницы ───────── */

export type Crumb = { href: string; label: string };

export function PageShell({
  title,
  lead,
  crumbs = [],
  aside,
  children,
}: {
  title: string;
  lead?: string;
  crumbs?: Crumb[];
  aside?: ReactNode;
  children: ReactNode;
}) {
  const trail = [{ href: "/", label: "Главная" }, ...crumbs];
  return (
    <main>
      <div className="border-b border-border bg-muted">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          {crumbs.length > 0 && (
            <>
              <nav aria-label="Навигация по разделу" className="mb-5 text-sm text-muted-foreground">
                {trail.map((c, i) => (
                  <span key={c.href}>
                    {i > 0 && <span className="mx-2 text-foreground/30">/</span>}
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
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-5xl">{title}</h1>
              {lead && <p className="mt-5 text-lg text-muted-foreground">{lead}</p>}
            </div>
            {aside}
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl space-y-16 px-4 py-12 sm:px-6 sm:py-16">{children}</div>
    </main>
  );
}

export function Section({ title, lead, children, id }: { title: string; lead?: string; children: ReactNode; id?: string }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-2xl sm:text-3xl">{title}</h2>
      {lead && <p className="mt-3 max-w-3xl text-muted-foreground">{lead}</p>}
      <div className="mt-7">{children}</div>
    </section>
  );
}

export function Grid({ children }: { children: ReactNode }) {
  return <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{children}</div>;
}

export function Prose({ children }: { children: ReactNode }) {
  return <div className="max-w-3xl space-y-4 text-[1.05rem] leading-relaxed">{children}</div>;
}

/* ───────── Картинки и заглушки под фото ───────── */

export type CoverKind = "venue" | "tub" | "school" | "guide" | "goods";

const coverIcons: Record<CoverKind, LucideIcon> = {
  venue: Flame,
  tub: Bath,
  school: GraduationCap,
  guide: Bath,
  goods: Package,
};

// Обложка карточки. Пока фото нет, показываем спокойную заглушку той же формы.
export function Cover({ src, alt, kind, className = "" }: { src?: string | null; alt: string; kind: CoverKind; className?: string }) {
  const Icon = coverIcons[kind];
  return (
    <div className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-ink-soft to-ink ${className}`}>
      {src ? (
        <img src={src} alt={alt} loading="lazy" className="size-full object-cover" />
      ) : (
        <div className="grid size-full place-items-center">
          <Icon className="size-14 text-gold/35" strokeWidth={1.25} aria-hidden="true" />
        </div>
      )}
    </div>
  );
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

export function Avatar({ name, src, size = "md" }: { name: string; src?: string | null; size?: "md" | "lg" }) {
  const box = size === "lg" ? "size-36 text-4xl" : "size-16 text-xl";
  return src ? (
    <img src={src} alt={name} loading="lazy" className={`${box} shrink-0 rounded-full object-cover`} />
  ) : (
    <div
      aria-hidden="true"
      className={`${box} grid shrink-0 place-items-center rounded-full bg-gradient-to-br from-ink-soft to-ink font-semibold text-gold`}
    >
      {initials(name) || <UserRound className="size-1/2" />}
    </div>
  );
}

/* ───────── Карточки ───────── */

export function Tags({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((t) => (
        <li key={t} className="rounded-full bg-muted px-2.5 py-1 text-xs text-foreground/80">{t}</li>
      ))}
    </ul>
  );
}

const cardBase =
  "group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-lg";

// Карточка с обложкой: бани, чаны, школы.
export function CoverCard({
  href,
  title,
  meta,
  text,
  tags = [],
  image,
  kind,
  demo = false,
  promo,
  highlight,
}: {
  href: string;
  title: string;
  highlight?: string | null;
  meta?: string | null;
  text?: string | null;
  tags?: string[];
  image?: string | null;
  kind: CoverKind;
  demo?: boolean;
  promo?: Pick<Promo, "featured" | "partner">;
}) {
  return (
    <Link href={href} className={`${cardBase} ${promo?.featured ? "border-primary/60" : ""}`}>
      <div className="relative">
        <Cover src={image} alt={title} kind={kind} />
        <span className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {demo && <DemoBadge />}
          {promo && <PromoBadges item={promo} />}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-lg group-hover:text-primary">{title}</h3>
          {meta && <p className="mt-1 text-sm text-muted-foreground">{meta}</p>}
        </div>
        {highlight && <p className="text-sm font-semibold text-primary">{highlight}</p>}
        {text && <p className="text-sm text-foreground/85">{text}</p>}
        <div className="mt-auto pt-1">
          <Tags items={tags} />
        </div>
      </div>
    </Link>
  );
}

// Простая текстовая карточка: статьи и ссылки на разделы.
export function TextCard({
  href,
  title,
  text,
  icon: Icon,
  image,
}: {
  href: string;
  title: string;
  text?: string;
  icon?: LucideIcon;
  image?: string;
}) {
  if (image) {
    return (
      <Link href={href} className={`${cardBase} !bg-white`}>
        <img src={image} alt="" width={720} height={720} loading="lazy" className="aspect-[4/3] w-full object-contain p-3" />
        <div className="flex flex-1 flex-col border-t border-border bg-card p-5">
          <h3 className="text-lg group-hover:text-primary">{title}</h3>
          {text && <p className="mt-2 text-sm text-muted-foreground">{text}</p>}
          <span className="mt-auto flex items-center gap-1.5 pt-4 text-sm font-semibold text-primary">
            Открыть
            <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </div>
      </Link>
    );
  }
  return (
    <Link href={href} className={`${cardBase} p-6`}>
      {Icon && (
        <span className="mb-5 grid size-12 place-items-center rounded-xl bg-accent text-primary">
          <Icon className="size-6" aria-hidden="true" />
        </span>
      )}
      <h3 className="text-lg group-hover:text-primary">{title}</h3>
      {text && <p className="mt-2 text-sm text-muted-foreground">{text}</p>}
      <span className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-semibold text-primary">
        Открыть
        <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  );
}

/* ───────── Блоки страницы карточки ───────── */

// Кнопки связи. Если контактов нет, показываем, что они появятся.
export function ContactPanel({
  contacts,
  demo = false,
  siteLabel = "Перейти на сайт",
  requestHref,
}: {
  contacts: Contacts;
  demo?: boolean;
  siteLabel?: string;
  // Куда ведёт кнопка «Оставить заявку». Показывается, если своих контактов в карточке нет.
  requestHref?: string;
}) {
  const btn = "flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition";
  return (
    <Panel title="Связаться">
      {hasContacts(contacts) ? (
        <div className="space-y-2.5">
          {contacts.phone && (
            <a href={telHref(contacts.phone)} className={`${btn} bg-primary text-primary-foreground hover:bg-primary/90`}>
              <Phone className="size-4" aria-hidden="true" />
              {contacts.phone}
            </a>
          )}
          {contacts.telegram && (
            <a href={`https://t.me/${contacts.telegram}`} rel="noopener" className={`${btn} border border-border hover:border-primary hover:text-primary`}>
              <Send className="size-4" aria-hidden="true" />
              Написать в Telegram
            </a>
          )}
          {contacts.site && (
            <a href={contacts.site} rel="noopener" className={`${btn} border border-border hover:border-primary hover:text-primary`}>
              <Globe className="size-4" aria-hidden="true" />
              {siteLabel}
            </a>
          )}
        </div>
      ) : requestHref ? (
        <>
          <Link href={requestHref} className={`${btn} bg-primary text-primary-foreground hover:bg-primary/90`}>
            Оставить заявку
          </Link>
          <p className="mt-3 text-xs text-muted-foreground">Телефон в анкете не указан. Заявку передадим мастеру.</p>
        </>
      ) : (
        <p className="text-sm text-muted-foreground">
          {demo ? "Здесь будут кнопки связи: телефон, Telegram и сайт." : "Контакты уточняются."}
        </p>
      )}
    </Panel>
  );
}

// Список по группам: отмеченные пункты с галочкой, остальные серым.
export function Checklist({ groups, selected }: { groups: readonly ChecklistGroup[]; selected: string[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {groups.map((group) => (
        <Panel key={group.title} title={group.title}>
          <ul className="space-y-2.5 text-sm">
            {Object.entries(group.items).map(([key, label]) => {
              const has = selected.includes(key);
              return (
                <li key={key} className={`flex items-start gap-2.5 ${has ? "" : "text-muted-foreground/60"}`}>
                  {has ? (
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={3} aria-hidden="true" />
                  ) : (
                    <Minus className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  )}
                  <span>
                    {label}
                    <span className="sr-only">{has ? " (есть)" : " (нет)"}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </Panel>
      ))}
    </div>
  );
}

// Фотографии. Пока их нет, показываем подсказку, что здесь будет.
export function Gallery({ images, alt, hint }: { images: string[]; alt: string; hint: string }) {
  if (images.length === 0) return <Notice>{hint}</Notice>;
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {images.map((src, i) => (
        <li key={src} className="overflow-hidden rounded-xl">
          <img src={src} alt={`${alt}, фото ${i + 1}`} loading="lazy" className="aspect-[4/3] w-full object-cover" />
        </li>
      ))}
    </ul>
  );
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="max-w-3xl list-disc space-y-2 pl-5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

/* ───────── Мелкие детали ───────── */

export function DemoBadge() {
  return (
    <span className="rounded-full bg-gold px-2.5 py-0.5 text-xs font-semibold text-ink">образец</span>
  );
}

// Пометки платного размещения. Появляются только у карточек, где они включены.
export function PromoBadges({ item }: { item: Pick<Promo, "featured" | "partner"> }) {
  return (
    <>
      {item.featured && (
        <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
          Выделено
        </span>
      )}
      {item.partner && (
        <span className="rounded-full border border-primary/50 bg-card px-2.5 py-0.5 text-xs font-semibold text-primary">
          Партнёр
        </span>
      )}
    </>
  );
}

// Блок на странице карточки: кодовое слово, признание о партнёрстве, маркировка рекламы.
export function PromoPanel({ item }: { item: Promo }) {
  if (!item.promoCode && !item.partner && !item.adMark) return null;
  return (
    <div className="space-y-4 rounded-xl border border-primary/40 bg-accent/50 p-6 text-sm">
      {item.promoCode && (
        <div>
          <p className="text-muted-foreground">Скидка по кодовому слову</p>
          <p className="mt-1 text-2xl font-bold tracking-wide text-primary">{item.promoCode}</p>
          <p className="mt-1 text-muted-foreground">Назовите его при обращении.</p>
        </div>
      )}
      {item.partner && (
        <p>Площадка получает вознаграждение от этой компании. На оценки и отзывы это не влияет.</p>
      )}
      {item.adMark && <p className="text-xs text-muted-foreground">{item.adMark}</p>}
    </div>
  );
}

// Плашка для мест, где пока нет настоящих данных.
export function Notice({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-xl border border-dashed border-primary/40 bg-accent/40 px-5 py-4 text-sm text-foreground/75">
      {children}
    </p>
  );
}

export function Facts({ rows }: { rows: [string, string | null | undefined][] }) {
  return (
    <dl className="divide-y divide-border text-sm">
      {rows.map(([k, v]) => (
        <div key={k} className="flex justify-between gap-6 py-2.5">
          <dt className="text-muted-foreground">{k}</dt>
          <dd className={v ? "text-right font-medium" : "text-right italic text-muted-foreground"}>
            {v ?? "уточняется"}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function Panel({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      {title && <h2 className="mb-4 text-lg">{title}</h2>}
      {children}
    </div>
  );
}

export function ButtonLink({ href, children, variant = "primary" }: { href: string; children: ReactNode; variant?: "primary" | "light" | "outline" }) {
  const styles = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    light: "bg-gold text-ink hover:bg-gold/90",
    outline: "border border-ink-foreground/30 text-ink-foreground hover:border-gold hover:text-gold",
  }[variant];
  return (
    <Link href={href} className={`inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition ${styles}`}>
      {children}
    </Link>
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="font-semibold text-primary underline-offset-4 hover:underline">
      {children}
    </Link>
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
