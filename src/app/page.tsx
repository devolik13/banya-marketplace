import { CardLink, Grid, Notice, PageShell, Section, TextLink } from "@/components/site/parts";

const sections = [
  {
    href: "/bani-na-drovah",
    title: "Бани на дровах",
    text: "Каталог бань с дровяной печью. Отдельные срубы, бассейны, купели, свои пармастера.",
  },
  {
    href: "/banshchiki",
    title: "Банщики и пармастера",
    text: "Анкеты мастеров: стаж, стиль парения, цена, видео работы.",
  },
  {
    href: "/bannye-chany",
    title: "Банные чаны",
    text: "Производители, цены, сравнение и советы по выбору от тех, кто работает с чанами каждый день.",
  },
  {
    href: "/shkoly-banshchikov",
    title: "Школы банщиков",
    text: "Где учат банному мастерству: программы, сроки, стоимость.",
  },
];

export default function HomePage() {
  return (
    <PageShell
      title="Бани на дровах, банщики и банные чаны"
      lead="Площадка о настоящей русской бане. Здесь собраны бани на дровах, мастера парения, производители чанов и школы, где учат ремеслу."
    >
      <Grid>
        {sections.map((s) => (
          <CardLink key={s.href} href={s.href} title={s.title} text={s.text} />
        ))}
      </Grid>

      <Section title="Как устроен отбор">
        <p className="max-w-3xl text-foreground">
          В каталог попадают только бани с печью на дровах. Сауны и электрические парные сюда не входят.
          Подробные условия описаны на странице <TextLink href="/o-proekte">о проекте</TextLink>.
        </p>
      </Section>

      <Section title="Для мастеров, бань и производителей">
        <p className="max-w-3xl text-foreground">
          Размещение в каталоге бесплатное. Как добавить анкету, баню, школу или производителя, описано
          на странице <TextLink href="/dobavit">как попасть в каталог</TextLink>.
        </p>
      </Section>

      <Notice>
        Сайт в разработке. Карточки с пометкой «образец» показывают, как будет выглядеть раздел, и будут
        заменены настоящими.
      </Notice>
    </PageShell>
  );
}
