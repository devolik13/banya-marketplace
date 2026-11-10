"use client";

import { lazy, Suspense } from "react";
import WithAngledImageOnRight from "@/components/blocks/heros/with-angled-image-on-right";
import { LanguageToggle } from "@/components/ui/language-toggle";

// Lazy load heavy components below the fold
const ServiceProviderGrid = lazy(() => import("@/components/marketplace/service-provider-grid"));
const VenueCatalog = lazy(() => import("@/components/marketplace/venue-catalog"));
const WellnessProducts = lazy(() => import("@/components/marketplace/wellness-products"));
const BookingFlow = lazy(() => import("@/components/marketplace/booking-flow"));
const TestimonialsGridWithCenteredCarousel = lazy(() => import("@/components/blocks/testimonials/testimonials-grid-with-centered-carousel").then(mod => ({ default: mod.TestimonialsGridWithCenteredCarousel })));
const FooterWithGrid = lazy(() => import("@/components/blocks/footers/footer-with-grid").then(mod => ({ default: mod.FooterWithGrid })));
const NewsCarousel = lazy(() => import("@/components/blocks/news/news-carousel").then(mod => ({ default: mod.NewsCarousel })));
const EducationSchoolsSection = lazy(() => import("@/components/blocks/education/education-schools-section"));

// Loading component for better UX
const SectionSkeleton = () => (
  <div className="w-full h-96 bg-muted animate-pulse rounded-lg" />
);

export default function HomeClient() {
  return (
    <main>
      <div className="fixed top-4 right-4 z-50">
        <LanguageToggle />
      </div>
      
      {/* Above the fold - load immediately */}
      <WithAngledImageOnRight />
      
      {/* Below the fold - lazy loaded with suspense */}
      <Suspense fallback={<SectionSkeleton />}>
        <ServiceProviderGrid />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <VenueCatalog />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <WellnessProducts />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <BookingFlow />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <NewsCarousel />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <EducationSchoolsSection />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <TestimonialsGridWithCenteredCarousel />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <FooterWithGrid />
      </Suspense>
    </main>
  );
}