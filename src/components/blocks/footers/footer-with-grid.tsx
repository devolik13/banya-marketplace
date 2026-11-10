"use client"

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Instagram, Facebook, Youtube, Shield, CreditCard, Mail } from "lucide-react";

export function FooterWithGrid() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail("");
  };

  return (
    <div className="bg-stone-600">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="border-b border-amber-600/30 pb-2">
          <div className="mb-10 max-w-xl">
            <Logo className="justify-start" />
            <p className="mb-4 text-sm text-amber-50">
              Ваш надёжный маркетплейс аутентичных банных переживаний. Соединяем любителей оздоровления с мастерами банного дела, премиальными заведениями и традиционными продуктами.
            </p>
            <div className="text-sm text-amber-50/90">
              Создано для оздоровительного сообщества от{" "}
              <Link
                href="/"
                className="font-medium text-amber-400 underline hover:text-amber-300"
              >
                Банный Маркетплейс
              </Link>
            </div>
            <div className="mt-2 text-sm text-amber-50/90">
              Следите за нами:{" "}
              <div className="mt-3 flex space-x-4">
                <Link
                  href="#"
                  className="text-amber-400 hover:text-amber-300"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="text-amber-400 hover:text-amber-300"
                >
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="text-amber-400 hover:text-amber-300"
                >
                  <Youtube className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="mb-10 max-w-md">
            <h4 className="mb-3 text-sm font-bold text-amber-50">Советы по оздоровлению и акции</h4>
            {!subscribed ? (
              <form onSubmit={handleNewsletterSubmit} className="flex space-x-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Введите email"
                  required
                  className="flex-1 rounded-md border border-amber-600/30 bg-amber-900/20 px-3 py-2 text-sm text-amber-50 placeholder-amber-50/60 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
                <button
                  type="submit"
                  className="flex items-center space-x-1 rounded-md bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700"
                >
                  <Mail className="h-4 w-4" />
                  <span>Подписаться</span>
                </button>
              </form>
            ) : (
              <div className="rounded-md bg-green-900/30 border border-green-600/30 px-3 py-2 text-sm text-green-300">
                Спасибо за подписку на наши советы по оздоровлению!
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 border-b border-amber-600/30 pb-10 pt-10 md:grid-cols-4">
          <ul className="text-base font-medium text-amber-50">
            <li className="mb-4 text-sm font-bold text-amber-200">
              О нас
            </li>
            {ABOUT_LINKS.map((item, idx) => (
              <li key={"about" + idx} className="mb-4 text-sm font-normal">
                <Link
                  href={item.href}
                  className="text-amber-50/80 hover:text-amber-300"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="text-base font-medium text-amber-50">
            <li className="mb-4 text-sm font-bold text-amber-200">
              Услуги
            </li>
            {SERVICES_LINKS.map((item, idx) => (
              <li key={"services" + idx} className="mb-4 text-sm font-normal">
                <Link
                  href={item.href}
                  className="text-amber-50/80 hover:text-amber-300"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="text-base font-medium text-amber-50">
            <li className="mb-4 text-sm font-bold text-amber-200">
              Поддержка
            </li>
            {SUPPORT_LINKS.map((item, idx) => (
              <li key={"support" + idx} className="mb-4 text-sm font-normal">
                <Link
                  href={item.href}
                  className="text-amber-50/80 hover:text-amber-300"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="text-base font-medium text-amber-50">
            <li className="mb-4 text-sm font-bold text-amber-200">
              Правовая информация
            </li>
            {LEGAL_LINKS.map((item, idx) => (
              <li key={"legal" + idx} className="mb-4 text-sm font-normal">
                <Link
                  href={item.href}
                  className="text-amber-50/80 hover:text-amber-300"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-col items-center space-y-4 border-b border-amber-600/30 pb-10 pt-6 md:flex-row md:justify-between md:space-y-0">
          <div className="flex flex-col items-center space-y-2 md:flex-row md:space-x-6 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-amber-50/90">
              <Shield className="h-4 w-4 text-green-400" />
              <span>Проверенные поставщики</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-amber-50/90">
              <CreditCard className="h-4 w-4 text-green-400" />
              <span>Безопасные платежи</span>
            </div>
          </div>
          <div className="text-xs text-amber-50/70">
            SSL шифрование • Соответствие PCI • Защита конфиденциальности
          </div>
        </div>

        <p className="mb-4 pt-6 text-sm text-amber-50/80 text-center md:text-left">
          © 2024 Банный Маркетплейс. Все права защищены.
        </p>
      </div>
    </div>
  );
}

const ABOUT_LINKS = [
  { title: "Наша миссия", href: "/about/mission" },
  { title: "Как это работает", href: "/about/how-it-works" },
  { title: "Сообщество", href: "/about/community" },
];

const SERVICES_LINKS = [
  { title: "Найти мастеров", href: "/services/find-masters" },
  { title: "Забронировать заведения", href: "/services/book-venues" },
  { title: "Магазин товаров", href: "/services/shop-products" },
];

const SUPPORT_LINKS = [
  { title: "Центр помощи", href: "/support/help" },
  { title: "Связаться с нами", href: "/support/contact" },
  { title: "Безопасность", href: "/support/safety" },
];

const LEGAL_LINKS = [
  { title: "Условия использования", href: "/legal/terms" },
  { title: "Политика конфиденциальности", href: "/legal/privacy" },
  { title: "Возвраты", href: "/legal/refunds" },
];

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link
      href="/"
      className={cn(
        "flex flex-shrink-0 items-center justify-center space-x-2 py-6 text-center text-2xl font-bold text-amber-50 selection:bg-amber-500",
        className
      )}
    >
      <div className="relative flex h-8 w-8 items-center justify-center rounded-md border border-amber-600 bg-amber-800 text-sm text-white antialiased md:h-6 md:w-6">
        <div className="absolute inset-x-0 -top-10 h-10 w-full rounded-full bg-amber-400/[0.2] blur-xl" />
        <div className="relative z-20 text-sm text-amber-300">
          <Image
            src="/logo.png"
            height="50"
            width="50"
            alt="Логотип банного маркетплейса"
            className="block"
          />
        </div>
      </div>
      <div
        className={cn(
          "flex items-center gap-2 font-sans text-xl text-amber-50"
        )}
      >
        Банный Маркетплейс{" "}
        <div className="relative rounded-sm border border-amber-600/30 bg-amber-900/30 px-2 py-0.5 text-xs font-bold text-amber-200">
          оздоровление
        </div>
      </div>
    </Link>
  );
};