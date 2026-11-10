"use client"

import WithAngledImageOnRight from "@/components/blocks/heros/with-angled-image-on-right"
import ServiceProviderGrid from "@/components/marketplace/service-provider-grid"
import VenueCatalog from "@/components/marketplace/venue-catalog"
import WellnessProducts from "@/components/marketplace/wellness-products"
import { TestimonialsGridWithCenteredCarousel } from "@/components/blocks/testimonials/testimonials-grid-with-centered-carousel"
import { FooterWithGrid } from "@/components/blocks/footers/footer-with-grid"
import { NewsCarousel } from "@/components/blocks/news/news-carousel"
import EducationSchoolsSection from "@/components/blocks/education/education-schools-section"

export default function Home() {
  return (
    <div className="min-h-screen">
      <WithAngledImageOnRight />
      <ServiceProviderGrid />
      <VenueCatalog />
      <WellnessProducts />
      <TestimonialsGridWithCenteredCarousel />
      <NewsCarousel />
      <EducationSchoolsSection />
      <FooterWithGrid />
    </div>
  );
}