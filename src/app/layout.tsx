import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

export const metadata: Metadata = {
  title: "Банная площадка: банщики, бани на дровах, школы и банные чаны",
  description:
    "Анкеты банщиков и пармастеров, бани на дровах, школы банного мастерства и банные чаны от производителей.",
  // Тестовая копия на Vercel не должна попадать в поиск. Убрать перед запуском на боевом домене.
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
