"use client"

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { HeroCarousel } from '@/components/ui/hero-carousel'

const navigation = [
  { name: 'nav.services', href: '#services' },
  { name: 'nav.venues', href: '#venues' },
  { name: 'education', label: 'Обучение', href: '#education' },
  { name: 'nav.products', href: '#products' },
  { name: 'nav.login', href: '#' },
]

// Banya hero images for the carousel
const heroImages = [
  {
    src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/11d5ac2e-ade7-49ad-abf6-4ee3cc7cf47b/generated_images/traditional-russian-banya-interior-with--5aad89c9-20250718134508.jpg?',
    alt: 'Traditional Russian banya interior with warm wooden elements and authentic atmosphere'
  },
  {
    src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/11d5ac2e-ade7-49ad-abf6-4ee3cc7cf47b/generated_images/luxury-russian-banya-spa-room-with-moder-36f57832-20250718134517.jpg?',
    alt: 'Luxury Russian banya spa room with modern wooden design and elegant atmosphere'
  },
  {
    src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/11d5ac2e-ade7-49ad-abf6-4ee3cc7cf47b/generated_images/traditional-wooden-russian-sauna-buildin-cc2cf956-20250718134544.jpg?',
    alt: 'Traditional wooden Russian banya building exterior in winter landscape'
  }
]

export default function WithAngledImageOnRight() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t } = useLanguage()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
    setMobileMenuOpen(false)
  }

  const handleNavClick = (href: string) => {
    if (href.startsWith('#') && href.length > 1) {
      const sectionId = href.substring(1)
      scrollToSection(sectionId)
    }
  }

  return (
    <div className="bg-background">
      <header className="absolute inset-x-0 top-0 z-50">
        <div className="mx-auto max-w-7xl">
          <div className="px-6 pt-6 lg:max-w-2xl lg:pr-0 lg:pl-8">
            <nav aria-label="Global" className="flex items-center justify-between lg:justify-start">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Banya Marketplace</span>
                <img
                  alt="Banya Marketplace"
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=amber&shade=600"
                  className="h-8 w-auto"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 rounded-md p-2.5 text-foreground lg:hidden"
              >
                <span className="sr-only">Open main menu</span>
                <Menu aria-hidden="true" className="size-6" />
              </button>
              <div className="hidden lg:ml-12 lg:flex lg:gap-x-14">
                {navigation.map((item) => (
                  <button 
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className="text-sm/6 font-semibold text-foreground font-[var(--font-body)] hover:text-primary transition-colors"
                  >
                    {item.label ? item.label : t(item.name)}
                  </button>
                ))}
              </div>
            </nav>
          </div>
        </div>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background p-6 sm:max-w-sm sm:ring-1 sm:ring-border">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Banya Marketplace</span>
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=amber&shade=600"
                  className="h-8 w-auto"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-foreground"
              >
                <span className="sr-only">Close menu</span>
                <X aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-border">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => handleNavClick(item.href)}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-foreground hover:bg-muted font-[var(--font-body)] w-full text-left"
                    >
                      {item.label ? item.label : t(item.name)}
                    </button>
                  ))}
                </div>
                <div className="py-6">
                  <button
                    onClick={() => handleNavClick('#')}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-foreground hover:bg-muted font-[var(--font-body)] w-full text-left"
                  >
                    {t('nav.login')}
                  </button>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <div className="relative">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform fill-background lg:block"
            >
              <polygon points="0,0 90,0 50,100 0,100" />
            </svg>

            <div className="relative px-6 py-32 sm:py-40 lg:px-8 lg:py-56 lg:pr-0">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                <div className="hidden sm:mb-10 sm:flex">
                  <div className="relative rounded-full px-3 py-1 text-sm/6 text-secondary ring-1 ring-border hover:ring-secondary/40 font-[var(--font-body)]">
                    {t('hero.subtitle')}.{' '}
                    <button 
                      onClick={() => scrollToSection('venues')}
                      className="font-semibold whitespace-nowrap text-primary hover:text-primary/80 transition-colors"
                    >
                      <span aria-hidden="true" className="absolute inset-0" />
                      {t('hero.learnMore')} <span aria-hidden="true">&rarr;</span>
                    </button>
                  </div>
                </div>
                <h1 className="text-5xl font-semibold tracking-tight text-foreground sm:text-7xl font-[var(--font-heading)]">
                  {t('hero.title')}
                </h1>
                <p className="mt-8 text-lg font-medium text-secondary sm:text-xl/8 font-[var(--font-body)]">
                  {t('hero.description')}
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <button
                    onClick={() => scrollToSection('services')}
                    className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-xs hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary font-[var(--font-body)] transition-colors"
                  >
                    {t('hero.primaryCta')}
                  </button>
                  <button 
                    onClick={() => scrollToSection('venues')}
                    className="text-sm/6 font-semibold text-foreground font-[var(--font-body)] hover:text-primary transition-colors"
                  >
                    {t('hero.secondaryCta')} <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-accent lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <HeroCarousel
            images={heroImages}
            autoRotateInterval={3000}
            className="aspect-3/2 lg:aspect-auto lg:h-full"
          />
        </div>
      </div>
    </div>
  )
}