import { ArrowRight, Bath, Check, Flame, GraduationCap, ShoppingBag, UserRound } from "lucide-react";
import { ButtonLink, Notice, Section, TextCard, TextLink } from "@/components/site/parts";
import { site } from "@/lib/site";

const sections = [
  {
    href: "/bani-na-drovah",
    icon: Flame,
    title: "Бани на дровах",
    text: "Каталог бань с дровяной печью: отдельные срубы, бассейны, купели.",
  },
  {
    href: "/banshchiki",
    icon: UserRound,
    title: "Банщики и пармастера",
    text: "Анкеты мастеров: услуги, стаж, цена, видео работы.",
  },
  {
    href: "/bannye-chany",
    icon: Bath,
    title: "Банные чаны",
    text: "Производители, цены и советы по выбору от практиков.",
  },
  {
    href: "/bannye-tovary",
    icon: ShoppingBag,
    title: "Банные товары",
    text: "Поставщики веников, шапок, килтов и трав. Розница и опт.",
  },
  {
    href: "/shkoly-banshchikov",
    icon: GraduationCap,
    title: "Школы банщиков",
    text: "Где учат банному мастерству: программы, сроки, стоимость.",
  },
];

const criteria = [
  { title: "Печь на дровах", text: "Сауны и электрические парные в каталог не входят." },
  { title: "Сруб целиком", text: "Баню снимает одна компания, посторонних нет." },
  { title: "Вода после пара", text: "Есть бассейн, купель или банный чан." },
  { title: "Свои мастера", text: "В бане работают банщики и пармастера." },
];

export default function HomePage() {
  return (
    <main>
      {/* Первый экран */}
      <section className="relative isolate overflow-hidden bg-ink text-ink-foreground">
        {site.heroImage ? (
          <>
            <img src={site.heroImage} alt="" className="absolute inset-0 -z-20 size-full object-cover" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
          </>
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[radial-gradient(60rem_30rem_at_85%_10%,rgba(224,164,88,0.22),transparent_60%),radial-gradient(40rem_24rem_at_10%_110%,rgba(180,95,6,0.25),transparent_60%)]"
          />
        )}
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">Только бани на дровах</p>
            <h1 className="mt-5 text-4xl sm:text-6xl">Бани на дровах, банщики и банные чаны</h1>
            <p className="mt-6 max-w-xl text-lg text-ink-foreground/75">
              Площадка о настоящей русской бане: где париться, у кого, в чём купаться после парной
              и где этому ремеслу учат.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/bani-na-drovah" variant="light">
                Найти баню <ArrowRight className="size-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/banshchiki" variant="outline">Выбрать банщика</ButtonLink>
            </div>
          </div>
          <ul className="space-y-4 rounded-2xl border border-ink-foreground/10 bg-ink-foreground/5 p-7 backdrop-blur">
            {criteria.map((c) => (
              <li key={c.title} className="flex gap-4">
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-gold text-ink">
                  <Check className="size-4" strokeWidth={3} aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-semibold">{c.title}</span>
                  <span className="block text-sm text-ink-foreground/65">{c.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-20 px-4 py-16 sm:px-6 sm:py-20">
        <Section title="Что есть на площадке">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {sections.map((s) => (
              <TextCard key={s.href} href={s.href} title={s.title} text={s.text} icon={s.icon} />
            ))}
          </div>
        </Section>

        <Section
          title="Как устроен отбор"
          lead="В каталог попадают только бани, которые проходят по четырём условиям."
        >
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {criteria.map((c, i) => (
              <li key={c.title} className="border-t-2 border-primary pt-5">
                <span className="text-sm font-semibold text-primary">0{i + 1}</span>
                <h3 className="mt-2 text-lg">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-sm text-muted-foreground">
            Подробнее на странице <TextLink href="/o-proekte">о проекте</TextLink>.
          </p>
        </Section>

        <section className="flex flex-wrap items-center justify-between gap-8 rounded-2xl bg-ink px-8 py-10 text-ink-foreground sm:px-12">
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-3xl">Для пармейстеров, бань и производителей</h2>
            <p className="mt-3 text-ink-foreground/70">
              Размещение в каталоге бесплатное. Анкета мастера, карточка бани, школа, производитель
              чанов или поставщик товаров.
            </p>
          </div>
          <ButtonLink href="/dobavit" variant="light">
            Как попасть в каталог <ArrowRight className="size-4" aria-hidden="true" />
          </ButtonLink>
        </section>

        <Notice>
          Сайт в разработке. Карточки с пометкой «образец» показывают, как будет выглядеть раздел,
          и будут заменены настоящими.
        </Notice>
      </div>
    </main>
  );
}
