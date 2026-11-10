import type { Metadata } from "next";
import "./globals.css";
import { Footer, Header } from "@/components/site/parts";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: ${site.shortDescription.toLowerCase()}`, template: `%s | ${site.name}` },
  description:
    "Каталог бань на дровах, анкеты банщиков, пармастеров и пармейстеров, производители банных чанов и школы банного мастерства.",
  robots: site.indexable ? { index: true, follow: true } : { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className="flex min-h-screen flex-col antialiased">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
