import type { Metadata } from "next";
import { Notice, PageShell, Section } from "@/components/site/parts";

export const metadata: Metadata = {
  title: "Как попасть в каталог",
  description: "Как банщику, бане, школе или производителю чанов бесплатно разместиться на площадке.",
};

const groups = [
  { title: "Банщикам и пармастерам", text: "Нужны фото, короткий рассказ о себе, стаж, стили парения, цена и видео работы." },
  { title: "Баням", text: "Нужны адрес, фото, описание, цены и подтверждение, что печь на дровах." },
  { title: "Школам", text: "Нужны программа, сроки, стоимость и презентация курса." },
  { title: "Производителям чанов", text: "Нужны модели, размеры, цены и условия доставки." },
];

export default function AddPage() {
  return (
    <PageShell
      title="Как попасть в каталог"
      lead="Размещение бесплатное. Ниже написано, что понадобится для карточки."
      crumbs={[{ href: "/dobavit", label: "Как попасть в каталог" }]}
    >
      {groups.map((g) => (
        <Section key={g.title} title={g.title}>
          <p className="max-w-3xl">{g.text}</p>
        </Section>
      ))}
      <Notice>Контакты для заявок появятся перед запуском сайта.</Notice>
    </PageShell>
  );
}
