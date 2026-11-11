import type { Metadata } from "next";
import { Notice, PageShell, Prose, TextLink } from "@/components/site/parts";

export const metadata: Metadata = { title: "Заявка мастеру", robots: { index: false } };

export default function RequestPage() {
  return (
    <PageShell
      title="Заявка мастеру"
      lead="Если мастер не указал телефон, гость оставляет заявку здесь, а площадка передаёт её мастеру."
      crumbs={[{ href: "/zayavka", label: "Заявка" }]}
    >
      <Prose>
        <p>
          В заявке будет три поля: как к вам обращаться, телефон или Telegram и что нужно: дата, место,
          сколько человек, какие процедуры.
        </p>
      </Prose>
      <Notice>
        Форма подключается перед запуском сайта. Пока вернитесь в <TextLink href="/banshchiki">каталог мастеров</TextLink>.
      </Notice>
    </PageShell>
  );
}
