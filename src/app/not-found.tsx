import { PageShell, TextLink } from "@/components/site/parts";

export default function NotFound() {
  return (
    <PageShell title="Страница не найдена" lead="Такой страницы нет. Возможно, она переехала.">
      <TextLink href="/">Вернуться на главную</TextLink>
    </PageShell>
  );
}
