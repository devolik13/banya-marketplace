import type { Metadata } from "next";
import { Notice, PageShell, Panel } from "@/components/site/parts";

export const metadata: Metadata = {
  title: "Как попасть в каталог",
  description: "Как банщику, бане, школе, производителю чанов или поставщику товаров бесплатно разместиться на площадке.",
};

const groups = [
  { title: "Банщикам, пармастерам и пармейстерам", text: "Нужны фото, короткий рассказ о себе, стаж, стили парения, цена и видео работы." },
  { title: "Баням", text: "Нужны адрес, фото, описание, цены и подтверждение, что печь на дровах." },
  { title: "Школам", text: "Нужны программа, сроки, стоимость и презентация курса." },
  { title: "Производителям чанов", text: "Нужны модели, размеры, цены и условия доставки." },
  { title: "Поставщикам банных товаров", text: "Нужны список товаров, условия розницы и опта, город и доставка." },
];

export default function AddPage() {
  return (
    <PageShell
      title="Как попасть в каталог"
      lead="Размещение бесплатное. Ниже написано, что понадобится для карточки."
      crumbs={[{ href: "/dobavit", label: "Как попасть в каталог" }]}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {groups.map((g) => (
          <Panel key={g.title} title={g.title}>
            <p className="text-sm text-muted-foreground">{g.text}</p>
          </Panel>
        ))}
      </div>
      <Notice>Контакты для заявок появятся перед запуском сайта.</Notice>
    </PageShell>
  );
}
